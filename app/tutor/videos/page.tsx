"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase } from "@/lib/api" // Import our new Supabase client
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, Upload, Plus, Loader2 } from "lucide-react"

export default function TutorVideosPage() {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videos, setVideos] = useState<any[]>([]) // Real video state

  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    subject: "",
    timeLimit: "7",
  })

  // 1. Fetch real videos from Supabase on load
  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    if (!error) setVideos(data || [])
  }

  // 2. The Actual Upload Logic
  const handleUpload = async () => {
    if (!videoFile || !uploadData.title) return alert("Please select a file and enter a title")

    setIsUploading(true)
    try {
      // Step A: Upload file to Supabase Storage
      const fileExt = videoFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data: uploadDataResp, error: uploadError } = await supabase.storage
        .from('uploads') // Ensure this bucket exists in Supabase!
        .upload(fileName, videoFile)

      if (uploadError) throw uploadError

      // Step B: Get the Public URL
      const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(fileName)

      // Step C: Insert record into Database
      const { error: dbError } = await supabase.from('videos').insert([{
        title: uploadData.title,
        description: uploadData.description,
        file_path: publicUrl,
        file_size: videoFile.size,
        time_limit: parseInt(uploadData.timeLimit),
        tutor_id: (await supabase.auth.getUser()).data.user?.id // Get current tutor ID
      }])

      if (dbError) throw dbError

      alert("Video Uploaded Successfully!")
      setShowUploadForm(false)
      fetchVideos() // Refresh list
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
           <div className="flex items-center space-x-4">
            <Link href="/tutor/dashboard"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2" />Back</Button></Link>
            <div className="flex items-center space-x-2"><BookOpen className="h-6 w-6 text-primary" /><span className="font-semibold">EasyStudy</span></div>
           </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Video Management</h1>
          <Button onClick={() => setShowUploadForm(true)}><Plus className="h-4 w-4 mr-2" />Upload New</Button>
        </div>

        {showUploadForm && (
          <Card className="mb-6">
            <CardHeader><CardTitle>Upload New Video</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Title" value={uploadData.title} onChange={(e) => setUploadData({...uploadData, title: e.target.value})} />
              <Textarea placeholder="Description" value={uploadData.description} onChange={(e) => setUploadData({...uploadData, description: e.target.value})} />
              
              <div className="space-y-2">
                <Label>Video File</Label>
                <Input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
              </div>

              <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                {isUploading ? "Uploading..." : "Finish Upload"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* List Videos */}
        <div className="grid gap-4">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
                <Badge>{video.time_limit} Days Access</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

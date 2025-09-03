"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, ArrowLeft, Upload, Play, Clock, Eye, Trash2, Edit, Plus, BarChart3 } from "lucide-react"

export default function TutorVideosPage() {
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    subject: "",
    timeLimit: "",
    accessType: "immediate", // immediate, scheduled, manual
  })

  // Mock video data with enhanced analytics
  const videos = [
    {
      id: 1,
      title: "Algebra Fundamentals - Chapter 1",
      description: "Introduction to basic algebraic concepts and operations",
      subject: "Mathematics",
      duration: "15:30",
      views: 23,
      completionRate: 78,
      avgWatchTime: "12:15",
      uploadDate: "2024-01-08",
      timeLimit: 7, // days
      status: "active",
      studentsWatching: 15,
      studentsCompleted: 12,
    },
    {
      id: 2,
      title: "Physics: Newton's Laws",
      description: "Understanding the three fundamental laws of motion",
      subject: "Physics",
      duration: "22:15",
      views: 18,
      completionRate: 65,
      avgWatchTime: "14:30",
      uploadDate: "2024-01-06",
      timeLimit: 14,
      status: "active",
      studentsWatching: 12,
      studentsCompleted: 8,
    },
    {
      id: 3,
      title: "Chemistry: Periodic Table",
      description: "Exploring the structure and patterns of the periodic table",
      subject: "Chemistry",
      duration: "18:45",
      views: 12,
      completionRate: 45,
      avgWatchTime: "8:20",
      uploadDate: "2024-01-04",
      timeLimit: 10,
      status: "draft",
      studentsWatching: 8,
      studentsCompleted: 4,
    },
  ]

  const handleUpload = () => {
    // TODO: Implement video upload logic
    console.log("Uploading video:", uploadData)
    setShowUploadForm(false)
    setUploadData({ title: "", description: "", subject: "", timeLimit: "", accessType: "immediate" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/tutor/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">EasyStudy</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Video Management</h1>
              <p className="text-muted-foreground">Upload and manage your tutorial videos with advanced controls</p>
            </div>
            <Button onClick={() => setShowUploadForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload New Video
            </Button>
          </div>
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upload New Video</CardTitle>
              <CardDescription>Add a new tutorial video with time-limited access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Video Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter video title"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={uploadData.subject}
                    onValueChange={(value) => setUploadData({ ...uploadData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this video covers"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeLimit">Access Time Limit (days)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    placeholder="7"
                    value={uploadData.timeLimit}
                    onChange={(e) => setUploadData({ ...uploadData, timeLimit: e.target.value })}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessType">Access Type</Label>
                  <Select
                    value={uploadData.accessType}
                    onValueChange={(value) => setUploadData({ ...uploadData, accessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate Access</SelectItem>
                      <SelectItem value="scheduled">Scheduled Release</SelectItem>
                      <SelectItem value="manual">Manual Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Video File</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">Drag and drop your video file here, or click to browse</p>
                  <p className="text-sm text-muted-foreground mb-4">Supported formats: MP4, MOV, AVI (Max 500MB)</p>
                  <Button variant="outline">Choose File</Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleUpload} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
                <Button variant="outline" onClick={() => setShowUploadForm(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Videos List with Enhanced Analytics */}
        <div className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
                      <Badge variant={video.status === "active" ? "default" : "secondary"}>{video.status}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{video.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{video.subject}</span>
                      <span>Duration: {video.duration}</span>
                      <span>{video.views} views</span>
                      <span>Uploaded: {new Date(video.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Play className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Enhanced Analytics */}
                <div className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{video.studentsWatching}</p>
                    <p className="text-xs text-muted-foreground">Currently Watching</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{video.studentsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{video.completionRate}%</p>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{video.avgWatchTime}</p>
                    <p className="text-xs text-muted-foreground">Avg Watch Time</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Access limit: {video.timeLimit} days</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      Set Time Limit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Student Progress
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {videos.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No videos uploaded yet</p>
              <p className="text-muted-foreground mb-4">Start by uploading your first tutorial video</p>
              <Button onClick={() => setShowUploadForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Your First Video
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

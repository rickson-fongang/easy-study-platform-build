"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/video-player"
import { BookOpen, ArrowLeft, CheckCircle, Clock, FileText } from "lucide-react"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const [videoProgress, setVideoProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Mock video data - in real app, fetch based on params.id
  const video = {
    id: params.id,
    title: "Algebra Fundamentals - Chapter 1",
    description:
      "Introduction to basic algebraic concepts and operations. This comprehensive tutorial covers the fundamental principles of algebra including variables, expressions, equations, and basic problem-solving techniques.",
    subject: "Mathematics",
    duration: "15:30",
    instructor: "Rickson Fongang",
    uploadDate: "2024-01-08",
    timeRemaining: 86400, // seconds
    transcript: `Welcome to Algebra Fundamentals Chapter 1. In this lesson, we'll explore the basic concepts of algebra...`,
    relatedVideos: [
      {
        id: "2",
        title: "Algebra Fundamentals - Chapter 2",
        duration: "18:20",
        thumbnail: "/placeholder.svg?height=120&width=200&text=Algebra+Ch2",
      },
      {
        id: "3",
        title: "Linear Equations Basics",
        duration: "22:15",
        thumbnail: "/placeholder.svg?height=120&width=200&text=Linear+Equations",
      },
    ],
  }

  const handleProgress = (progress: number) => {
    setVideoProgress(progress)
    // TODO: Save progress to backend
    console.log(`Video progress: ${progress}%`)
  }

  const handleComplete = () => {
    setIsCompleted(true)
    setVideoProgress(100)
    // TODO: Mark video as completed in backend
    console.log("Video completed!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/student/videos">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Videos
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              videoId={video.id}
              title={video.title}
              duration={video.duration}
              onProgress={handleProgress}
              onComplete={handleComplete}
              timeRemaining={video.timeRemaining}
            />

            {/* Video Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{video.title}</CardTitle>
                    <CardDescription className="text-base">{video.description}</CardDescription>
                  </div>
                  {isCompleted && (
                    <Badge className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Badge variant="outline">{video.subject}</Badge>
                  </div>
                  <span>Instructor: {video.instructor}</span>
                  <span>Duration: {video.duration}</span>
                  <span>Uploaded: {new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Transcript</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{video.transcript}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{Math.round(videoProgress)}%</div>
                  <p className="text-sm text-muted-foreground">Video Progress</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{Math.round(videoProgress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>

                {video.timeRemaining > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Access expires in:</span>
                    </div>
                    <span className="font-medium">
                      {Math.floor(video.timeRemaining / 86400)}d {Math.floor((video.timeRemaining % 86400) / 3600)}h
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Videos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {video.relatedVideos.map((relatedVideo) => (
                  <Link key={relatedVideo.id} href={`/student/videos/${relatedVideo.id}`}>
                    <div className="flex space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <img
                        src={relatedVideo.thumbnail || "/placeholder.svg"}
                        alt={relatedVideo.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">{relatedVideo.title}</p>
                        <p className="text-xs text-muted-foreground">{relatedVideo.duration}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Download Notes
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Complete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

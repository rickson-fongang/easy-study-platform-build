"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ArrowLeft, Search, Play, Clock, CheckCircle, Lock } from "lucide-react"

export default function StudentVideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")

  // Mock video data
  const videos = [
    {
      id: 1,
      title: "Algebra Fundamentals - Chapter 1",
      description: "Introduction to basic algebraic concepts and operations",
      subject: "Mathematics",
      duration: "15:30",
      progress: 75,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Algebra+Ch1",
      isCompleted: false,
      timeRemaining: 86400, // seconds
      isAccessible: true,
    },
    {
      id: 2,
      title: "Physics: Newton's Laws",
      description: "Understanding the three fundamental laws of motion",
      subject: "Physics",
      duration: "22:15",
      progress: 100,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Newton+Laws",
      isCompleted: true,
      timeRemaining: 172800,
      isAccessible: true,
    },
    {
      id: 3,
      title: "Chemistry: Periodic Table",
      description: "Exploring the structure and patterns of the periodic table",
      subject: "Chemistry",
      duration: "18:45",
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Periodic+Table",
      isCompleted: false,
      timeRemaining: 259200,
      isAccessible: true,
    },
    {
      id: 4,
      title: "Advanced Calculus - Derivatives",
      description: "Deep dive into derivative calculations and applications",
      subject: "Mathematics",
      duration: "28:30",
      progress: 0,
      thumbnail: "/placeholder.svg?height=200&width=300&text=Calculus",
      isCompleted: false,
      timeRemaining: 0,
      isAccessible: false,
    },
  ]

  const subjects = ["all", "Mathematics", "Physics", "Chemistry"]

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = selectedSubject === "all" || video.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return "Expired"
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)

    if (days > 0) return `${days}d ${hours}h left`
    if (hours > 0) return `${hours}h left`
    return "< 1h left"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/student/dashboard">
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Video Library</h1>
          <p className="text-muted-foreground">Access your tutorial videos and track your progress</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    onClick={() => setSelectedSubject(subject)}
                    size="sm"
                  >
                    {subject === "all" ? "All Subjects" : subject}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className={`overflow-hidden ${!video.isAccessible ? "opacity-60" : ""}`}>
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />

                {/* Overlay for locked videos */}
                {!video.isAccessible && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Lock className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Access Expired</p>
                    </div>
                  </div>
                )}

                {/* Play button overlay */}
                {video.isAccessible && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link href={`/student/videos/${video.id}`}>
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Duration badge */}
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">{video.duration}</Badge>

                {/* Completion badge */}
                {video.isCompleted && (
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <Badge variant="outline">{video.subject}</Badge>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeRemaining(video.timeRemaining)}</span>
                  </div>
                </div>

                {/* Progress */}
                {video.progress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{video.progress}%</span>
                    </div>
                    <Progress value={video.progress} className="h-2" />
                  </div>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  {video.isAccessible ? (
                    <Link href={`/student/videos/${video.id}`} className="w-full">
                      <Button className="w-full">
                        {video.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue Watching
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Watching
                          </>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      Access Expired
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No videos found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, Play, FileText, Clock, CheckCircle, Circle } from "lucide-react"

interface CourseDetailProps {
  params: {
    id: string
  }
}

export default function CourseDetail({ params }: CourseDetailProps) {
  const [activeModule, setActiveModule] = useState(0)

  // Mock course data - in real app, fetch based on params.id
  const course = {
    id: params.id,
    title: "Advanced Mathematics",
    description: "Master calculus and algebra concepts with comprehensive video lessons and practice exercises",
    progress: 85,
    totalVideos: 15,
    watchedVideos: 13,
    nextDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
    tutor: {
      name: "Dr. Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Mathematics Professor with 15+ years of experience",
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Calculus",
        videos: [
          { id: 1, title: "What is Calculus?", duration: "12:30", completed: true },
          { id: 2, title: "Limits and Continuity", duration: "18:45", completed: true },
          { id: 3, title: "Derivatives Basics", duration: "22:15", completed: true },
        ],
      },
      {
        id: 2,
        title: "Advanced Derivatives",
        videos: [
          { id: 4, title: "Chain Rule", duration: "15:20", completed: true },
          { id: 5, title: "Product and Quotient Rules", duration: "19:30", completed: true },
          { id: 6, title: "Implicit Differentiation", duration: "16:45", completed: false },
        ],
      },
      {
        id: 3,
        title: "Integration Techniques",
        videos: [
          { id: 7, title: "Basic Integration", duration: "20:10", completed: false },
          { id: 8, title: "Integration by Parts", duration: "17:25", completed: false },
          { id: 9, title: "Substitution Method", duration: "14:50", completed: false },
        ],
      },
    ],
  }

  const totalDuration = course.modules.reduce(
    (total, module) =>
      total +
      module.videos.reduce((moduleTotal, video) => {
        const [minutes, seconds] = video.duration.split(":").map(Number)
        return moduleTotal + minutes + seconds / 60
      }, 0),
    0,
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/student/courses">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
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
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{course.title}</CardTitle>
                    <CardDescription className="text-base">{course.description}</CardDescription>
                  </div>
                  <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span>{course.totalVideos} videos</span>
                  <span>{Math.round(totalDuration)} minutes</span>
                  <span>Due: {new Date(course.nextDeadline).toLocaleDateString()}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardHeader>
            </Card>

            {/* Course Modules */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>Video lessons organized by modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border border-border rounded-lg">
                      <button
                        onClick={() => setActiveModule(activeModule === moduleIndex ? -1 : moduleIndex)}
                        className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">{module.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {module.videos.filter((v) => v.completed).length}/{module.videos.length}
                            </span>
                            <div
                              className={`transform transition-transform ${activeModule === moduleIndex ? "rotate-180" : ""}`}
                            >
                              ▼
                            </div>
                          </div>
                        </div>
                      </button>

                      {activeModule === moduleIndex && (
                        <div className="border-t border-border">
                          {module.videos.map((video) => (
                            <div
                              key={video.id}
                              className="p-4 border-b border-border last:border-b-0 hover:bg-muted/25"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  {video.completed ? (
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-foreground">{video.title}</p>
                                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{video.duration}</span>
                                  </div>
                                </div>
                                <Button size="sm" variant={video.completed ? "outline" : "default"}>
                                  <Play className="h-3 w-3 mr-1" />
                                  {video.completed ? "Rewatch" : "Watch"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tutor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Your Tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={course.tutor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {course.tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{course.tutor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.tutor.bio}</p>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Message Tutor
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Course Materials
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Study Schedule
                </Button>
                <Link href="/student/tasks">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Assignments
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Videos Watched</span>
                  <span className="text-sm font-medium">
                    {course.watchedVideos}/{course.totalVideos}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Spent</span>
                  <span className="text-sm font-medium">8.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completion</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

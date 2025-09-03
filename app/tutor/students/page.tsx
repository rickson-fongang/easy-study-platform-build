"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, ArrowLeft, Search, MessageCircle, Eye, Clock, CheckCircle, Trash2 } from "lucide-react"

export default function TutorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      progress: 75,
      videosWatched: 18,
      tasksCompleted: 12,
      lastActive: "2 hours ago",
      status: "active",
      joinDate: "2023-09-15",
      timeRemaining: 86400, // seconds
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      progress: 60,
      videosWatched: 14,
      tasksCompleted: 8,
      lastActive: "1 day ago",
      status: "active",
      joinDate: "2023-09-20",
      timeRemaining: 72000,
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      email: "mike.rodriguez@email.com",
      progress: 45,
      videosWatched: 10,
      tasksCompleted: 6,
      lastActive: "3 days ago",
      status: "inactive",
      joinDate: "2023-10-01",
      timeRemaining: 43200,
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      progress: 90,
      videosWatched: 22,
      tasksCompleted: 15,
      lastActive: "30 minutes ago",
      status: "active",
      joinDate: "2023-08-30",
      timeRemaining: 93600,
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
          <p className="text-muted-foreground">Monitor and manage all your students</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All ({students.length})
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  size="sm"
                >
                  Active ({students.filter((s) => s.status === "active").length})
                </Button>
                <Button
                  variant={filterStatus === "inactive" ? "default" : "outline"}
                  onClick={() => setFilterStatus("inactive")}
                  size="sm"
                >
                  Inactive ({students.filter((s) => s.status === "inactive").length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>{student.email}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-semibold text-foreground">{student.videosWatched}</p>
                    <p className="text-xs text-muted-foreground">Videos</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-semibold text-foreground">{student.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded-lg">
                    <p className="text-lg font-semibold text-foreground">{formatTime(student.timeRemaining)}</p>
                    <p className="text-xs text-muted-foreground">Time Left</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Last active: {student.lastActive}</p>
                  <p>Joined: {new Date(student.joinDate).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    Set Time
                  </Button>
                </div>

                {/* Admin Actions */}
                <div className="flex space-x-2 pt-2 border-t border-border">
                  <Button size="sm" className="flex-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Send Reminder
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No students found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

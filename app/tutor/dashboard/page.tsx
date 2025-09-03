"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  Video,
  MessageCircle,
  Clock,
  Upload,
  Settings,
  Bell,
  BarChart3,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Trash2,
  Eye,
  Send,
  Sparkles,
} from "lucide-react"
import { TehillahProvider, useTehillah } from "@/components/tehillah-provider"
import { TehillahInsights } from "@/components/tehillah-insights"

function TutorDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const { openChat } = useTehillah()

  // Mock data
  const tutorName = "Rickson Fongang"
  const stats = {
    totalStudents: 45,
    activeStudents: 38,
    totalVideos: 24,
    totalTasks: 12,
    pendingApprovals: 3,
    messagesUnread: 7,
  }

  const recentStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@email.com",
      progress: 75,
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@email.com",
      progress: 60,
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      email: "mike@email.com",
      progress: 45,
      lastActive: "3 days ago",
      status: "inactive",
    },
  ]

  const pendingStudents = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma@email.com",
      registrationDate: "2024-01-10",
      adminCode: "STUDY2024",
    },
    {
      id: 2,
      name: "David Kim",
      email: "david@email.com",
      registrationDate: "2024-01-09",
      adminCode: "STUDY2024",
    },
  ]

  const recentVideos = [
    {
      id: 1,
      title: "Algebra Fundamentals - Chapter 1",
      subject: "Mathematics",
      duration: "15:30",
      views: 23,
      uploadDate: "2024-01-08",
    },
    {
      id: 2,
      title: "Physics: Newton's Laws",
      subject: "Physics",
      duration: "22:15",
      views: 18,
      uploadDate: "2024-01-06",
    },
  ]

  const taskSubmissions = [
    {
      id: 1,
      studentName: "Alex Johnson",
      taskTitle: "Math Assignment 4",
      subject: "Mathematics",
      submittedDate: "2024-01-10",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Sarah Chen",
      taskTitle: "Physics Lab Report",
      subject: "Physics",
      submittedDate: "2024-01-09",
      status: "reviewed",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">EasyStudy</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {stats.messagesUnread > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0">
                    {stats.messagesUnread}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={openChat}>
                <Sparkles className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>RF</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {tutorName}!</h1>
          <p className="text-muted-foreground">Manage your students and content from your admin dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeStudents}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalVideos}</p>
                </div>
                <Video className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <TehillahInsights userRole="tutor" context="dashboard" />

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Student Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Recent Student Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">Last active: {student.lastActive}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.progress}%</p>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Task Submissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Recent Task Submissions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {taskSubmissions.map((task) => (
                    <div key={task.id} className="p-3 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-foreground">{task.taskTitle}</p>
                          <p className="text-sm text-muted-foreground">by {task.studentName}</p>
                        </div>
                        <Badge variant={task.status === "pending" ? "destructive" : "default"}>{task.status}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">{task.subject}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                    <Upload className="h-6 w-6" />
                    <span>Upload Video</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                    <Send className="h-6 w-6" />
                    <span>Send Reminder</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                    <Clock className="h-6 w-6" />
                    <span>Set Time Limits</span>
                  </Button>
                  <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                    <BarChart3 className="h-6 w-6" />
                    <span>View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Students ({stats.activeStudents})</CardTitle>
                  <CardDescription>Manage your enrolled students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                        <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Pending Approvals ({stats.pendingApprovals})</span>
                  </CardTitle>
                  <CardDescription>Students waiting for approval</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingStudents.map((student) => (
                    <div key={student.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Registered: {new Date(student.registrationDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" className="flex-1">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Video Management</CardTitle>
                    <CardDescription>Upload and manage your tutorial videos</CardDescription>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Video
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentVideos.map((video) => (
                    <div key={video.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-foreground">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{video.subject}</p>
                        </div>
                        <Badge variant="outline">{video.duration}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4 text-sm text-muted-foreground">
                          <span>{video.views} views</span>
                          <span>Uploaded: {new Date(video.uploadDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            Set Limits
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Task Management</CardTitle>
                    <CardDescription>Review and manage student task submissions</CardDescription>
                  </div>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Create New Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taskSubmissions.map((task) => (
                    <div key={task.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-foreground">{task.taskTitle}</p>
                          <p className="text-sm text-muted-foreground">Submitted by {task.studentName}</p>
                          <p className="text-xs text-muted-foreground">
                            {task.subject} • {new Date(task.submittedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={task.status === "pending" ? "destructive" : "default"}>{task.status}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Grade
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Feedback
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Time Management</span>
                  </CardTitle>
                  <CardDescription>Set global time limits for student access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Study Time Limit (hours)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="8"
                      min="1"
                      max="24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Access Duration (days)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="30"
                      min="1"
                    />
                  </div>
                  <Button className="w-full">Update Time Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Platform Settings</span>
                  </CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Admin Registration Code</label>
                    <input type="text" className="w-full p-2 border border-border rounded-md" placeholder="STUDY2024" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Maximum Students</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-border rounded-md"
                      placeholder="100"
                      min="1"
                    />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function TutorDashboard() {
  return (
    <TehillahProvider userRole="tutor" context="dashboard">
      <TutorDashboardContent />
    </TehillahProvider>
  )
}

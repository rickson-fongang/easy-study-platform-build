"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, ArrowLeft, Calendar, Clock, FileText, Upload, Send } from "lucide-react"

interface TaskDetailProps {
  params: {
    id: string
  }
}

export default function TaskDetail({ params }: TaskDetailProps) {
  const [submission, setSubmission] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock task data - in real app, fetch based on params.id
  const task = {
    id: params.id,
    title: "Calculus Assignment 6",
    description:
      "Solve integration problems 15-25 from Chapter 8. Show all work and explain your reasoning for each step. Pay special attention to problems 20-22 as they involve integration by parts.",
    subject: "Mathematics",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending",
    courseId: "1",
    courseName: "Advanced Mathematics",
    tutor: {
      name: "Dr. Sarah Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    instructions: [
      "Complete problems 15-25 from Chapter 8",
      "Show all work for each problem",
      "Explain your reasoning for complex steps",
      "Submit as PDF or clear photos",
      "Include your name and date on each page",
    ],
    attachments: [
      {
        id: 1,
        name: "Chapter_8_Problems.pdf",
        size: "2.3 MB",
        type: "pdf",
      },
    ],
    maxPoints: 100,
    submissionHistory: [],
  }

  const handleSubmit = async () => {
    if (!submission.trim()) return

    setIsSubmitting(true)
    // TODO: Implement submission logic
    console.log("Submitting task:", { taskId: params.id, submission })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmission("")
    }, 2000)
  }

  const handleFileUpload = () => {
    // TODO: Implement file upload
    console.log("File upload clicked")
  }

  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const isOverdue = daysUntilDue < 0
  const isDueSoon = daysUntilDue <= 1 && daysUntilDue >= 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/student/tasks">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tasks
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
          {/* Task Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{task.title}</CardTitle>
                    <CardDescription className="text-base">
                      {task.subject} • {task.courseName}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      task.status === "completed"
                        ? "default"
                        : isOverdue
                          ? "destructive"
                          : isDueSoon
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {isOverdue ? "Overdue" : isDueSoon ? "Due Soon" : task.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Assigned: {new Date(task.assignedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span className={isOverdue ? "text-red-500" : isDueSoon ? "text-orange-500" : ""}>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span>{task.maxPoints} points</span>
                </div>
              </CardHeader>
            </Card>

            {/* Task Description */}
            <Card>
              <CardHeader>
                <CardTitle>Assignment Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{task.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Instructions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {task.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            {task.attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {task.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">{attachment.name}</p>
                            <p className="text-sm text-muted-foreground">{attachment.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submission Area */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
                <CardDescription>Upload your completed assignment or add notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Add Notes or Comments</label>
                  <Textarea
                    placeholder="Add any notes about your submission..."
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleFileUpload} variant="outline" className="flex-1 bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting || !submission.trim()} className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit Assignment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tutor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Assigned by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={task.tutor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {task.tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{task.tutor.name}</p>
                    <p className="text-sm text-muted-foreground">Mathematics Tutor</p>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Message Tutor
                </Button>
              </CardContent>
            </Card>

            {/* Task Details */}
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="secondary">{task.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Points</span>
                  <span className="text-sm font-medium">{task.maxPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Left</span>
                  <span
                    className={`text-sm font-medium ${isOverdue ? "text-red-500" : isDueSoon ? "text-orange-500" : ""}`}
                  >
                    {isOverdue
                      ? `${Math.abs(daysUntilDue)} days overdue`
                      : daysUntilDue === 0
                        ? "Due today"
                        : `${daysUntilDue} days left`}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/student/courses/${task.courseId}`}>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Course
                  </Button>
                </Link>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Related Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

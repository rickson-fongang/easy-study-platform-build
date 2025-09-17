"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  Clock,
  MessageCircle,
  User,
  Play,
  FileText,
  Calendar,
  Sparkles,
  Bell,
  Settings,
} from "lucide-react";
import { TehillahGuide } from "@/components/tehillah-guide";
import { TehillahProvider, useTehillah } from "@/components/tehillah-provider";
import { TehillahInsights } from "@/components/tehillah-insights";

function StudentDashboardContent({
  studentName = "Alex Johnson",
  studentEmail = "alex.johnson@email.com",
  courses = [],
  recentActivities = [],
  upcomingTasks = [],
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(86400); // 24 hours in seconds
  const [showTehillahTip, setShowTehillahTip] = useState(true);

  const { openChat } = useTehillah();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - sticky */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  EasyStudy
                </span>
              </div>
              <Badge variant="secondary">Student</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar - sticky below header */}
      <nav className="w-full bg-primary/10 border-b border-border sticky top-[64px] z-40">
        <div className="container mx-auto px-4 py-2 flex justify-center gap-6">
          <Button variant="ghost">
            <Clock className="h-4 w-4 mr-2" />
            Recent
          </Button>
          <Button variant="ghost">
            <BookOpen className="h-4 w-4 mr-2" />
            My Courses
          </Button>
          <Button variant="ghost">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
          <Button variant="ghost">
            <FileText className="h-4 w-4 mr-2" />
            Task
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {getGreeting()}, {studentName}!
          </h1>
          <p className="text-muted-foreground">
            Ready to continue your learning journey today?
          </p>
        </div>

        {/* Tehillah Welcome Tip */}
        {showTehillahTip && (
          <div className="mb-6">
            <TehillahGuide
              message="Welcome to your dashboard! I'm here to help you stay on track with your studies. Check out your progress below and don't forget about your upcoming deadlines."
              isVisible={showTehillahTip}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTehillahTip(false)}
              className="mt-2 text-xs"
            >
              Got it, thanks!
            </Button>
          </div>
        )}

        {/* Time Remaining Alert */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">
                    Study Time Remaining
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Set by your tutor
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {formatTime(timeRemaining)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Hours:Minutes:Seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tehillah Insights component */}
            <TehillahInsights userRole="student" context="dashboard" />

            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>My Courses</span>
                </CardTitle>
                <CardDescription>
                  Track your progress across all enrolled courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.length === 0 ? (
                  <p>No courses enrolled yet.</p>
                ) : (
                  courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium text-foreground">
                          {course.title}
                        </h3>
                        <Badge
                          variant={
                            course.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            {course.watchedVideos}/{course.totalVideos} videos
                            completed
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            Next deadline:{" "}
                            {new Date(course.nextDeadline).toLocaleDateString()}
                          </p>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest learning activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.length === 0 ? (
                    <p>No recent activities.</p>
                  ) : (
                    recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          {activity.type === "video" && (
                            <Play className="h-4 w-4 text-primary" />
                          )}
                          {activity.type === "task" && (
                            <FileText className="h-4 w-4 text-primary" />
                          )}
                          {activity.type === "message" && (
                            <MessageCircle className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Chat Section */}
            <Card>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
                <CardDescription>
                  Interact with friends and tutors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                  onClick={openChat}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Open Chat
                </Button>
              </CardContent>
            </Card>

            {/* Task Section */}
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>View and manage your tasks</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingTasks.length === 0 ? (
                  <p>No upcoming tasks.</p>
                ) : (
                  upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border border-border rounded-lg mb-2"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-foreground">
                          {task.title}
                        </h4>
                        <Badge
                          variant={
                            task.status === "pending"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {task.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      <Button
                        size="sm"
                        className="w-full mt-2 bg-transparent"
                        variant="outline"
                      >
                        View Task
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Friends
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" onClick={openChat}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ask Tehillah
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            {/* Study Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Videos Watched</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="text-sm font-medium">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Study Hours</span>
                  <span className="text-sm font-medium">8.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Messages Sent</span>
                  <span className="text-sm font-medium">23</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard(props) {
  // Fetch dynamic data here and pass as props
  // Example: useEffect(() => { fetch data and set state }, [])
  // For now, pass static data for demonstration
  const courses = [
    {
      id: 1,
      title: "Mathematics Fundamentals",
      progress: 75,
      totalVideos: 12,
      watchedVideos: 9,
      nextDeadline: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      title: "Physics Basics",
      progress: 45,
      totalVideos: 8,
      watchedVideos: 4,
      nextDeadline: "2024-01-20",
      status: "active",
    },
    {
      id: 3,
      title: "Chemistry Introduction",
      progress: 20,
      totalVideos: 10,
      watchedVideos: 2,
      nextDeadline: "2024-01-25",
      status: "pending",
    },
  ];

  const recentActivities = [
    { id: 1, type: "video", title: "Algebra Basics - Chapter 3", time: "2 hours ago" },
    { id: 2, type: "task", title: "Physics Problem Set 1", time: "1 day ago" },
    { id: 3, type: "message", title: "New message from tutor", time: "2 days ago" },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Math Assignment 4",
      subject: "Mathematics",
      dueDate: "2024-01-16",
      status: "pending",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-01-18",
      status: "in-progress",
    },
  ];

  return (
    <TehillahProvider userRole="student" context="dashboard">
      <StudentDashboardContent
        studentName="Alex Johnson"
        studentEmail="alex.johnson@email.com"
        courses={courses}
        recentActivities={recentActivities}
        upcomingTasks={upcomingTasks}
      />
    </TehillahProvider>
  );
}

"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Clock, MessageCircle, User, Play, FileText, Sparkles, Settings, RefreshCw } from "lucide-react"
import Link from "next/link"
import { TehillahGuide } from "@/components/tehillah-guide"
import { TehillahProvider, useTehillah } from "@/components/tehillah-provider"
import { TehillahInsights } from "@/components/tehillah-insights"
import { NotificationDropdown } from "@/components/notification-dropdown"
import {
  useStudentProfile,
  useStudentCourses,
  useStudentActivities,
  useStudentTasks,
  useStudentStats,
  useTimeRemaining,
} from "@/hooks/use-student-data"

function StudentDashboardContent() {
  const [showTehillahTip, setShowTehillahTip] = useState(true)
  const { openChat } = useTehillah()

  const { profile, loading: profileLoading, error: profileError } = useStudentProfile()
  const { courses, loading: coursesLoading, error: coursesError, refetch: refetchCourses } = useStudentCourses()
  const {
    activities,
    loading: activitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useStudentActivities()
  const { tasks, loading: tasksLoading, error: tasksError, refetch: refetchTasks } = useStudentTasks()
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useStudentStats()
  const { timeRemaining, loading: timeLoading } = useTimeRemaining()

  // Section refs for scrolling
  const recentRef = useRef(null)
  const coursesRef = useRef(null)
  const chatRef = useRef(null)
  const taskRef = useRef(null)

  const handleNavClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const handleRefreshAll = () => {
    refetchCourses()
    refetchActivities()
    refetchTasks()
    refetchStats()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - sticky */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span className="text-base sm:text-lg font-semibold text-foreground">EasyStudy</span>
              </Link>
              <Badge variant="secondary" className="text-xs">
                Student
              </Badge>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={handleRefreshAll} className="p-2">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <NotificationDropdown />
              <Button variant="ghost" size="sm" onClick={openChat} className="p-2">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Link href="/student/profile">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8 cursor-pointer">
                  <AvatarImage src={profile?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {profileLoading
                      ? "..."
                      : profile?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar - sticky below header */}
      <nav className="w-full bg-primary/10 border-b border-border sticky top-[56px] sm:top-[64px] z-40">
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="flex justify-start sm:justify-center gap-2 sm:gap-6 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant="ghost"
              onClick={() => handleNavClick(recentRef)}
              className="whitespace-nowrap text-xs sm:text-sm"
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Recent
            </Button>
            <Link href="/student/courses">
              <Button variant="ghost" className="whitespace-nowrap text-xs sm:text-sm">
                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                My Courses
              </Button>
            </Link>
            <Link href="/student/chatroom">
              <Button variant="ghost" className="whitespace-nowrap text-xs sm:text-sm">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Chat
              </Button>
            </Link>
            <Link href="/student/tasks">
              <Button variant="ghost" className="whitespace-nowrap text-xs sm:text-sm">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Tasks
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 text-balance">
            {getGreeting()},{" "}
            {profileLoading ? (
              <Skeleton className="inline-block w-24 sm:w-32 h-6 sm:h-8" />
            ) : (
              profile?.name || "Student"
            )}
            !
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground text-pretty">
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
            <Button variant="ghost" size="sm" onClick={() => setShowTehillahTip(false)} className="mt-2 text-xs">
              Got it, thanks!
            </Button>
          </div>
        )}

        {/* Time Remaining Alert */}
        <Card className="mb-4 sm:mb-6 border-primary/20 bg-primary/5">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <div>
                  <p className="text-sm sm:text-base font-medium text-foreground">Study Time Remaining</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Set by your tutor</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                {timeLoading ? (
                  <Skeleton className="w-20 sm:w-24 h-6 sm:h-8" />
                ) : (
                  <p className="text-xl sm:text-2xl font-bold text-primary">{formatTime(timeRemaining)}</p>
                )}
                <p className="text-xs text-muted-foreground">Hours:Minutes:Seconds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Tehillah Insights component */}
            <TehillahInsights userRole="student" context="dashboard" />

            {/* My Courses Section */}
            <div ref={coursesRef}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>My Courses</span>
                    </div>
                    <Link href="/student/courses">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Track your progress across all enrolled courses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {coursesLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 sm:p-4 border border-border rounded-lg">
                          <Skeleton className="w-32 sm:w-48 h-5 sm:h-6 mb-2 sm:mb-3" />
                          <Skeleton className="w-full h-2 mb-2" />
                          <div className="flex justify-between">
                            <Skeleton className="w-20 sm:w-24 h-3 sm:h-4" />
                            <Skeleton className="w-12 sm:w-16 h-6 sm:h-8" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : coursesError ? (
                    <div className="text-center py-6 sm:py-8">
                      <p className="text-sm sm:text-base text-muted-foreground mb-4">Failed to load courses</p>
                      <Button variant="outline" onClick={refetchCourses} size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                      </Button>
                    </div>
                  ) : courses.length === 0 ? (
                    <p className="text-center py-6 sm:py-8 text-sm sm:text-base text-muted-foreground">
                      No courses enrolled yet.
                    </p>
                  ) : (
                    courses.slice(0, 2).map((course) => (
                      <div key={course.id} className="p-3 sm:p-4 border border-border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-1 sm:space-y-0">
                          <h3 className="text-sm sm:text-base font-medium text-foreground text-balance">
                            {course.title}
                          </h3>
                          <Badge
                            variant={course.status === "active" ? "default" : "secondary"}
                            className="text-xs self-start sm:self-auto"
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                            <span>
                              {course.watchedVideos}/{course.totalVideos} videos completed
                            </span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <p className="text-xs text-muted-foreground">
                              Next deadline: {new Date(course.nextDeadline).toLocaleDateString()}
                            </p>
                            <Link href={`/student/courses/${course.id}`}>
                              <Button size="sm" variant="outline" className="w-full sm:w-auto bg-transparent">
                                <Play className="h-3 w-3 mr-1" />
                                Continue
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Section */}
            <div ref={recentRef}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activitiesLoading ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center space-x-3 p-2">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                              <Skeleton className="w-48 h-4 mb-1" />
                              <Skeleton className="w-24 h-3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : activitiesError ? (
                      <div className="text-center py-4">
                        <p className="text-sm sm:text-base text-muted-foreground mb-2">Failed to load activities</p>
                        <Button variant="outline" size="sm" onClick={refetchActivities}>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      </div>
                    ) : activities.length === 0 ? (
                      <p className="text-center py-4 text-sm sm:text-base text-muted-foreground">
                        No recent activities.
                      </p>
                    ) : (
                      activities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            {activity.type === "video" && <Play className="h-4 w-4 text-primary" />}
                            {activity.type === "task" && <FileText className="h-4 w-4 text-primary" />}
                            {activity.type === "message" && <MessageCircle className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Section */}
            <div ref={chatRef}>
              <Card>
                <CardHeader>
                  <CardTitle>Chat</CardTitle>
                  <CardDescription>Interact with friends and tutors</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full justify-start bg-transparent" variant="outline" onClick={openChat}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Open Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Task Section */}
            <div ref={taskRef}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Tasks</CardTitle>
                    <Link href="/student/tasks">
                      <Button variant="ghost" size="sm">
                        View All
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>View and manage your tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  {tasksLoading ? (
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="p-3 border border-border rounded-lg">
                          <Skeleton className="w-32 sm:w-48 h-4 mb-2" />
                          <Skeleton className="w-20 sm:w-24 h-3 mb-2" />
                          <Skeleton className="w-24 sm:w-32 h-3 mb-2" />
                          <Skeleton className="w-full h-8" />
                        </div>
                      ))}
                    </div>
                  ) : tasksError ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-2">Failed to load tasks</p>
                      <Button variant="outline" size="sm" onClick={refetchTasks}>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    </div>
                  ) : tasks.length === 0 ? (
                    <p className="text-center py-4 text-sm text-muted-foreground">No upcoming tasks.</p>
                  ) : (
                    tasks.slice(0, 2).map((task) => (
                      <div key={task.id} className="p-3 border border-border rounded-lg mb-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                          <h4 className="text-sm font-medium text-foreground text-balance">{task.title}</h4>
                          <Badge
                            variant={
                              task.status === "pending"
                                ? "destructive"
                                : task.status === "overdue"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-xs self-start sm:self-auto"
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{task.subject}</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                        <Link href={`/student/tasks/${task.id}`}>
                          <Button size="sm" className="w-full bg-transparent" variant="outline">
                            View Task
                          </Button>
                        </Link>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <Link href="/student/chatroom">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat with Friends
                  </Button>
                </Link>
                <Link href="/student/profile">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Button className="w-full justify-start bg-transparent text-sm" variant="outline" onClick={openChat}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Ask Tehillah
                </Button>
                <Link href="/student/settings">
                  <Button className="w-full justify-start bg-transparent text-sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Study Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {statsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-8 h-4" />
                      </div>
                    ))}
                  </div>
                ) : statsError ? (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground mb-2">Failed to load stats</p>
                    <Button variant="outline" size="sm" onClick={refetchStats}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  </div>
                ) : stats ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Videos Watched</span>
                      <span className="text-sm font-medium">{stats.videosWatched}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tasks Completed</span>
                      <span className="text-sm font-medium">{stats.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Study Hours</span>
                      <span className="text-sm font-medium">{stats.studyHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Messages Sent</span>
                      <span className="text-sm font-medium">{stats.messagesSent}</span>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  return (
    <TehillahProvider userRole="student" context="dashboard">
      <StudentDashboardContent />
    </TehillahProvider>
  )
}

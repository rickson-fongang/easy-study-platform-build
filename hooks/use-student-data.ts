"use client"

import { useState, useEffect, useCallback } from "react"
import { studentApi, type User, type Course, type Activity, type Task, type StudyStats } from "@/lib/api"

export function useStudentProfile() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching student profile...")

      const response = await studentApi.getProfile()

      if (response.success && response.data) {
        console.log("[v0] Profile loaded successfully:", response.data)
        setProfile(response.data)
      } else {
        console.log("[v0] Profile API failed, using demo data:", response.error)
        setError(response.error || "Failed to load profile")
        setProfile({
          id: "demo-student",
          name: "Alex Johnson (Demo)",
          email: "alex.johnson@email.com",
          role: "student",
          avatar: "/placeholder.svg?height=32&width=32",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        })
      }
    } catch (err) {
      console.error("[v0] Profile fetch error:", err)
      setError("Failed to load profile")
      setProfile({
        id: "demo-student",
        name: "Alex Johnson (Demo)",
        email: "alex.johnson@email.com",
        role: "student",
        avatar: "/placeholder.svg?height=32&width=32",
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return { profile, loading, error, refetch: fetchProfile }
}

export function useStudentCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true)
      const response = await studentApi.getCourses()

      if (response.success && response.data) {
        setCourses(response.data)
      } else {
        setCourses([
          {
            id: "1",
            title: "Mathematics Fundamentals",
            description: "Learn the basics of mathematics",
            progress: 75,
            totalVideos: 12,
            watchedVideos: 9,
            nextDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            status: "active",
            tutorId: "tutor-1",
            enrolledAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Physics Basics",
            description: "Introduction to physics concepts",
            progress: 45,
            totalVideos: 8,
            watchedVideos: 4,
            nextDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
            status: "active",
            tutorId: "tutor-1",
            enrolledAt: new Date().toISOString(),
          },
          {
            id: "3",
            title: "Chemistry Introduction",
            description: "Basic chemistry principles",
            progress: 20,
            totalVideos: 10,
            watchedVideos: 2,
            nextDeadline: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
            status: "pending",
            tutorId: "tutor-1",
            enrolledAt: new Date().toISOString(),
          },
        ])
      }
    } catch (err) {
      setError("Failed to load courses")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  return { courses, loading, error, refetch: fetchCourses }
}

export function useStudentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      const response = await studentApi.getActivities(10)

      if (response.success && response.data) {
        setActivities(response.data)
      } else {
        setActivities([
          {
            id: "1",
            type: "video",
            title: "Algebra Basics - Chapter 3",
            time: "2 hours ago",
            userId: "demo-student",
            courseId: "1",
          },
          {
            id: "2",
            type: "task",
            title: "Physics Problem Set 1",
            time: "1 day ago",
            userId: "demo-student",
            courseId: "2",
          },
          {
            id: "3",
            type: "message",
            title: "New message from tutor",
            time: "2 days ago",
            userId: "demo-student",
          },
        ])
      }
    } catch (err) {
      setError("Failed to load activities")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  return { activities, loading, error, refetch: fetchActivities }
}

export function useStudentTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      const response = await studentApi.getTasks()

      if (response.success && response.data) {
        setTasks(response.data)
      } else {
        setTasks([
          {
            id: "1",
            title: "Math Assignment 4",
            description: "Complete exercises 1-10",
            subject: "Mathematics",
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: "pending",
            courseId: "1",
            studentId: "demo-student",
            tutorId: "tutor-1",
          },
          {
            id: "2",
            title: "Physics Lab Report",
            description: "Write lab report for experiment 3",
            subject: "Physics",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "in-progress",
            courseId: "2",
            studentId: "demo-student",
            tutorId: "tutor-1",
          },
        ])
      }
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return { tasks, loading, error, refetch: fetchTasks }
}

export function useStudentStats() {
  const [stats, setStats] = useState<StudyStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const response = await studentApi.getStats()

      if (response.success && response.data) {
        setStats(response.data)
      } else {
        setStats({
          videosWatched: 12,
          tasksCompleted: 5,
          studyHours: 8.5,
          messagesSent: 23,
          weeklyProgress: 78,
          totalCourses: 3,
        })
      }
    } catch (err) {
      setError("Failed to load stats")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}

export function useTimeRemaining() {
  const [timeRemaining, setTimeRemaining] = useState(86400) // 24 hours default
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTimeRemaining() {
      try {
        setLoading(true)
        const response = await studentApi.getTimeRemaining()

        if (response.success && response.data) {
          setTimeRemaining(response.data.timeRemaining)
        }
      } catch (err) {
        setError("Failed to load time remaining")
      } finally {
        setLoading(false)
      }
    }

    fetchTimeRemaining()

    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return { timeRemaining, loading, error }
}

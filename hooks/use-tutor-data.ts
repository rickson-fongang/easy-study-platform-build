"use client"

import { useState, useEffect, useCallback } from "react"
import { tutorApi, type User, type Task, type TutorStats } from "@/lib/api"

export function useTutorProfile() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      const response = await tutorApi.getProfile()

      if (response.success && response.data) {
        setProfile(response.data)
      } else {
        setProfile({
          id: "demo-tutor",
          name: "Rickson Fongang",
          email: "rickson@easystudy.com",
          role: "tutor",
          avatar: "/placeholder.svg?height=32&width=32",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
        })
      }
    } catch (err) {
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return { profile, loading, error, refetch: fetchProfile }
}

export function useTutorStats() {
  const [stats, setStats] = useState<TutorStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      const response = await tutorApi.getStats()

      if (response.success && response.data) {
        setStats(response.data)
      } else {
        setStats({
          totalStudents: 45,
          activeStudents: 38,
          totalVideos: 24,
          totalTasks: 156,
          pendingApprovals: 7,
          thisWeekViews: 342,
          avgCompletionRate: 78.5,
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

export function useTutorStudents() {
  const [students, setStudents] = useState<User[]>([])
  const [pendingStudents, setPendingStudents] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true)
      const [studentsResponse, pendingResponse] = await Promise.all([
        tutorApi.getStudents("active"),
        tutorApi.getPendingStudents(),
      ])

      if (studentsResponse.success && studentsResponse.data) {
        setStudents(studentsResponse.data)
      } else {
        setStudents([
          {
            id: "1",
            name: "Sarah Wilson",
            email: "sarah@email.com",
            role: "student",
            createdAt: new Date().toISOString(),
            lastActive: "2 hours ago",
          },
          {
            id: "2",
            name: "Mike Chen",
            email: "mike@email.com",
            role: "student",
            createdAt: new Date().toISOString(),
            lastActive: "1 day ago",
          },
          {
            id: "3",
            name: "Emma Davis",
            email: "emma@email.com",
            role: "student",
            createdAt: new Date().toISOString(),
            lastActive: "3 hours ago",
          },
        ])
      }

      if (pendingResponse.success && pendingResponse.data) {
        setPendingStudents(pendingResponse.data)
      } else {
        setPendingStudents([
          {
            id: "4",
            name: "John Smith",
            email: "john@email.com",
            role: "student",
            createdAt: new Date().toISOString(),
            lastActive: "Just now",
          },
          {
            id: "5",
            name: "Lisa Brown",
            email: "lisa@email.com",
            role: "student",
            createdAt: new Date().toISOString(),
            lastActive: "30 minutes ago",
          },
        ])
      }
    } catch (err) {
      setError("Failed to load students")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const approveStudent = async (studentId: string) => {
    try {
      const response = await tutorApi.approveStudent(studentId)
      if (response.success) {
        const student = pendingStudents.find((s) => s.id === studentId)
        if (student) {
          setPendingStudents((prev) => prev.filter((s) => s.id !== studentId))
          setStudents((prev) => [...prev, student])
        }
      }
      return response
    } catch (err) {
      return { success: false, error: "Failed to approve student" }
    }
  }

  const rejectStudent = async (studentId: string) => {
    try {
      const response = await tutorApi.rejectStudent(studentId)
      if (response.success) {
        setPendingStudents((prev) => prev.filter((s) => s.id !== studentId))
      }
      return response
    } catch (err) {
      return { success: false, error: "Failed to reject student" }
    }
  }

  return {
    students,
    pendingStudents,
    loading,
    error,
    approveStudent,
    rejectStudent,
    refetch: fetchStudents,
  }
}

export function useTutorTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [submissions, setSubmissions] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      const [tasksResponse, submissionsResponse] = await Promise.all([
        tutorApi.getTasks(),
        tutorApi.getTaskSubmissions(),
      ])

      if (tasksResponse.success && tasksResponse.data) {
        setTasks(tasksResponse.data)
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
            studentId: "student-1",
            tutorId: "demo-tutor",
          },
          {
            id: "2",
            title: "Physics Lab Report",
            description: "Write lab report for experiment 3",
            subject: "Physics",
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: "in-progress",
            courseId: "2",
            studentId: "student-2",
            tutorId: "demo-tutor",
          },
        ])
      }

      if (submissionsResponse.success && submissionsResponse.data) {
        setSubmissions(submissionsResponse.data)
      } else {
        setSubmissions([
          {
            id: "3",
            title: "Chemistry Quiz 1",
            description: "Basic chemistry concepts",
            subject: "Chemistry",
            dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            status: "completed",
            courseId: "3",
            studentId: "student-3",
            tutorId: "demo-tutor",
            submittedAt: new Date().toISOString(),
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

  const gradeTask = async (taskId: string, grade: number, feedback?: string) => {
    try {
      const response = await tutorApi.gradeTask(taskId, grade, feedback)
      if (response.success && response.data) {
        setSubmissions((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, grade, status: "completed" as const } : task)),
        )
      }
      return response
    } catch (err) {
      return { success: false, error: "Failed to grade task" }
    }
  }

  return { tasks, submissions, loading, error, gradeTask, refetch: fetchTasks }
}

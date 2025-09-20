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
      console.log("[v0] Fetching tutor profile...")
      const response = await tutorApi.getProfile()
      console.log("[v0] Tutor profile response:", response)

      if (response.success && response.data) {
        setProfile(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to load profile")
        setProfile(null)
      }
    } catch (err) {
      console.error("[v0] Tutor profile error:", err)
      setError("Failed to load profile")
      setProfile(null)
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
      console.log("[v0] Fetching tutor stats...")
      const response = await tutorApi.getStats()
      console.log("[v0] Tutor stats response:", response)

      if (response.success && response.data) {
        setStats(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to load stats")
        setStats(null)
      }
    } catch (err) {
      console.error("[v0] Tutor stats error:", err)
      setError("Failed to load stats")
      setStats(null)
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
      console.log("[v0] Fetching tutor students...")
      const [studentsResponse, pendingResponse] = await Promise.all([
        tutorApi.getStudents("active"),
        tutorApi.getPendingStudents(),
      ])
      console.log("[v0] Students response:", studentsResponse)
      console.log("[v0] Pending students response:", pendingResponse)

      if (studentsResponse.success && studentsResponse.data) {
        setStudents(studentsResponse.data)
      } else {
        setStudents([])
        setError(studentsResponse.error || "Failed to load students")
      }

      if (pendingResponse.success && pendingResponse.data) {
        setPendingStudents(pendingResponse.data)
      } else {
        setPendingStudents([])
        if (!error) setError(pendingResponse.error || "Failed to load pending students")
      }
    } catch (err) {
      console.error("[v0] Tutor students error:", err)
      setError("Failed to load students")
      setStudents([])
      setPendingStudents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const approveStudent = async (studentId: string) => {
    try {
      console.log("[v0] Approving student:", studentId)
      const response = await tutorApi.approveStudent(studentId)
      console.log("[v0] Approve student response:", response)

      if (response.success) {
        const student = pendingStudents.find((s) => s.id === studentId)
        if (student) {
          setPendingStudents((prev) => prev.filter((s) => s.id !== studentId))
          setStudents((prev) => [...prev, student])
        }
      }
      return response
    } catch (err) {
      console.error("[v0] Approve student error:", err)
      return { success: false, error: "Failed to approve student" }
    }
  }

  const rejectStudent = async (studentId: string) => {
    try {
      console.log("[v0] Rejecting student:", studentId)
      const response = await tutorApi.rejectStudent(studentId)
      console.log("[v0] Reject student response:", response)

      if (response.success) {
        setPendingStudents((prev) => prev.filter((s) => s.id !== studentId))
      }
      return response
    } catch (err) {
      console.error("[v0] Reject student error:", err)
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
      console.log("[v0] Fetching tutor tasks...")
      const [tasksResponse, submissionsResponse] = await Promise.all([
        tutorApi.getTasks(),
        tutorApi.getTaskSubmissions(),
      ])
      console.log("[v0] Tasks response:", tasksResponse)
      console.log("[v0] Submissions response:", submissionsResponse)

      if (tasksResponse.success && tasksResponse.data) {
        setTasks(tasksResponse.data)
      } else {
        setTasks([])
        setError(tasksResponse.error || "Failed to load tasks")
      }

      if (submissionsResponse.success && submissionsResponse.data) {
        setSubmissions(submissionsResponse.data)
      } else {
        setSubmissions([])
        if (!error) setError(submissionsResponse.error || "Failed to load submissions")
      }
    } catch (err) {
      console.error("[v0] Tutor tasks error:", err)
      setError("Failed to load tasks")
      setTasks([])
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const gradeTask = async (taskId: string, grade: number, feedback?: string) => {
    try {
      console.log("[v0] Grading task:", taskId, grade, feedback)
      const response = await tutorApi.gradeTask(taskId, grade, feedback)
      console.log("[v0] Grade task response:", response)

      if (response.success && response.data) {
        setSubmissions((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, grade, status: "completed" as const } : task)),
        )
      }
      return response
    } catch (err) {
      console.error("[v0] Grade task error:", err)
      return { success: false, error: "Failed to grade task" }
    }
  }

  return { tasks, submissions, loading, error, gradeTask, refetch: fetchTasks }
}

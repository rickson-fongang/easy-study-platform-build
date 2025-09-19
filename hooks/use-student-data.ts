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
        console.log("[v0] Profile API failed:", response.error)
        setError(response.error || "Failed to load profile")
        setProfile(null)
      }
    } catch (err) {
      console.error("[v0] Profile fetch error:", err)
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
        setError(response.error || "Failed to load courses")
        setCourses([])
      }
    } catch (err) {
      setError("Failed to load courses")
      setCourses([])
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
        setError(response.error || "Failed to load activities")
        setActivities([])
      }
    } catch (err) {
      setError("Failed to load activities")
      setActivities([])
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
        setError(response.error || "Failed to load tasks")
        setTasks([])
      }
    } catch (err) {
      setError("Failed to load tasks")
      setTasks([])
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
        setError(response.error || "Failed to load stats")
        setStats(null)
      }
    } catch (err) {
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

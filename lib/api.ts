// API configuration and utilities for dynamic data fetching
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://easystudy-api-production.up.railway.app/api"

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "tutor" | "admin"
  avatar?: string
  createdAt: string
  lastActive: string
}

export interface Course {
  id: string
  title: string
  description: string
  progress: number
  totalVideos: number
  watchedVideos: number
  nextDeadline: string
  status: "active" | "pending" | "completed"
  tutorId: string
  enrolledAt: string
}

export interface Activity {
  id: string
  type: "video" | "task" | "message" | "login"
  title: string
  description?: string
  time: string
  courseId?: string
  userId: string
}

export interface Task {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  status: "pending" | "in-progress" | "completed" | "overdue"
  courseId: string
  studentId: string
  tutorId: string
  submittedAt?: string
  grade?: number
}

export interface StudyStats {
  videosWatched: number
  tasksCompleted: number
  studyHours: number
  messagesSent: number
  weeklyProgress: number
  totalCourses: number
}

export interface TutorStats {
  totalStudents: number
  activeStudents: number
  totalVideos: number
  totalTasks: number
  pendingApprovals: number
  thisWeekViews: number
  avgCompletionRate: number
}

// Generic API fetch function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem("authToken")
    const fullUrl = `${API_BASE_URL}${endpoint}`

    console.log("[v0] Making API request to:", fullUrl)

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    console.log("[v0] API response status:", response.status)

    const data = await response.json()
    console.log("[v0] API response data:", data)

    if (!response.ok) {
      console.log("[v0] API request failed:", data.message || "Unknown error")
      return {
        success: false,
        error: data.message || "An error occurred",
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    console.error("[v0] API request failed:", error)
    return {
      success: false,
      error: "Network error occurred",
    }
  }
}

// Student API functions
export const studentApi = {
  getProfile: () => apiRequest<User>("/students/profile"),
  getCourses: () => apiRequest<Course[]>("/students/courses"),
  getActivities: (limit = 10) => apiRequest<Activity[]>(`/students/activities?limit=${limit}`),
  getTasks: (status?: string) => apiRequest<Task[]>(`/students/tasks${status ? `?status=${status}` : ""}`),
  getStats: () => apiRequest<StudyStats>("/students/stats"),
  getTimeRemaining: () => apiRequest<{ timeRemaining: number }>("/students/time-remaining"),
  updateProfile: (data: Partial<User>) =>
    apiRequest<User>("/students/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  submitTask: (taskId: string, submission: FormData) =>
    apiRequest<Task>(`/students/tasks/${taskId}/submit`, {
      method: "POST",
      body: submission,
    }),
}

// Tutor API functions
export const tutorApi = {
  getProfile: () => apiRequest<User>("/tutors/profile"),
  getStats: () => apiRequest<TutorStats>("/tutors/stats"),
  getStudents: (status?: string) => apiRequest<User[]>(`/tutors/students${status ? `?status=${status}` : ""}`),
  getPendingStudents: () => apiRequest<User[]>("/tutors/students/pending"),
  getVideos: () => apiRequest<any[]>("/tutors/videos"),
  getTasks: () => apiRequest<Task[]>("/tutors/tasks"),
  getTaskSubmissions: () => apiRequest<Task[]>("/tutors/tasks/submissions"),
  approveStudent: (studentId: string) =>
    apiRequest<{ success: boolean }>(`/tutors/students/${studentId}/approve`, {
      method: "POST",
    }),
  rejectStudent: (studentId: string) =>
    apiRequest<{ success: boolean }>(`/tutors/students/${studentId}/reject`, {
      method: "POST",
    }),
  updateTimeLimit: (timeLimit: number) =>
    apiRequest<{ success: boolean }>("/tutors/settings/time-limit", {
      method: "PUT",
      body: JSON.stringify({ timeLimit }),
    }),
  createTask: (taskData: Partial<Task>) =>
    apiRequest<Task>("/tutors/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),
  gradeTask: (taskId: string, grade: number, feedback?: string) =>
    apiRequest<Task>(`/tutors/tasks/${taskId}/grade`, {
      method: "PUT",
      body: JSON.stringify({ grade, feedback }),
    }),
}

// Auth API functions
export const authApi = {
  login: (email: string, password: string, role: string) =>
    apiRequest<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    }),
  register: (userData: { name: string; email: string; password: string; role: string }) =>
    apiRequest<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  logout: () =>
    apiRequest<{ success: boolean }>("/auth/logout", {
      method: "POST",
    }),
  refreshToken: () => apiRequest<{ token: string }>("/auth/refresh"),
}

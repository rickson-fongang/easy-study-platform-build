// API configuration and utilities for dynamic data fetching
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "easystudy-api-production.up.railway.app"

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

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
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
    console.error("API request failed:", error)
    return {
      success: false,
      error: "Network error occurred",
    }
  }
}

// Student API functions
export const studentApi = {
  getProfile: () => apiRequest<User>("/student/profile"),
  getCourses: () => apiRequest<Course[]>("/student/courses"),
  getActivities: (limit = 10) => apiRequest<Activity[]>(`/student/activities?limit=${limit}`),
  getTasks: (status?: string) => apiRequest<Task[]>(`/student/tasks${status ? `?status=${status}` : ""}`),
  getStats: () => apiRequest<StudyStats>("/student/stats"),
  getTimeRemaining: () => apiRequest<{ timeRemaining: number }>("/student/time-remaining"),
  updateProfile: (data: Partial<User>) =>
    apiRequest<User>("/student/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  submitTask: (taskId: string, submission: FormData) =>
    apiRequest<Task>(`/student/tasks/${taskId}/submit`, {
      method: "POST",
      body: submission,
    }),
}

// Tutor API functions
export const tutorApi = {
  getProfile: () => apiRequest<User>("/tutor/profile"),
  getStats: () => apiRequest<TutorStats>("/tutor/stats"),
  getStudents: (status?: string) => apiRequest<User[]>(`/tutor/students${status ? `?status=${status}` : ""}`),
  getPendingStudents: () => apiRequest<User[]>("/tutor/students/pending"),
  getVideos: () => apiRequest<any[]>("/tutor/videos"),
  getTasks: () => apiRequest<Task[]>("/tutor/tasks"),
  getTaskSubmissions: () => apiRequest<Task[]>("/tutor/tasks/submissions"),
  approveStudent: (studentId: string) =>
    apiRequest<{ success: boolean }>(`/tutor/students/${studentId}/approve`, {
      method: "POST",
    }),
  rejectStudent: (studentId: string) =>
    apiRequest<{ success: boolean }>(`/tutor/students/${studentId}/reject`, {
      method: "POST",
    }),
  updateTimeLimit: (timeLimit: number) =>
    apiRequest<{ success: boolean }>("/tutor/settings/time-limit", {
      method: "PUT",
      body: JSON.stringify({ timeLimit }),
    }),
  createTask: (taskData: Partial<Task>) =>
    apiRequest<Task>("/tutor/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    }),
  gradeTask: (taskId: string, grade: number, feedback?: string) =>
    apiRequest<Task>(`/tutor/tasks/${taskId}/grade`, {
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

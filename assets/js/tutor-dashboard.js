// Tutor Dashboard JavaScript
class TutorDashboard {
  constructor() {
    this.init()
  }

  init() {
    this.loadTutorData()
    this.setupUserDropdown()
    this.setupModals()
    this.setupProgressFilter()
    this.loadDashboardData()
  }

  loadTutorData() {
    const user = window.EasyStudy.getCurrentUser()
    if (user) {
      document.getElementById("tutorName").textContent = user.first_name || "Tutor"
      document.getElementById("tutorInitials").textContent = (user.first_name?.[0] || "") + (user.last_name?.[0] || "")
    }
  }

  setupUserDropdown() {
    const dropdownToggle = document.getElementById("userDropdown")
    const dropdownMenu = document.getElementById("userDropdownMenu")

    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation()
        dropdownMenu.classList.toggle("show")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        dropdownMenu.classList.remove("show")
      })
    }
  }

  setupModals() {
    // Upload form handler
    const uploadForm = document.getElementById("uploadForm")
    if (uploadForm) {
      uploadForm.addEventListener("submit", this.handleVideoUpload.bind(this))
    }

    // Reminder form handler
    const reminderForm = document.getElementById("reminderForm")
    if (reminderForm) {
      reminderForm.addEventListener("submit", this.handleSendReminder.bind(this))
    }

    // Close modals when clicking outside
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeAllModals()
      }
    })
  }

  setupProgressFilter() {
    const progressFilter = document.getElementById("progressFilter")
    if (progressFilter) {
      progressFilter.addEventListener("change", (e) => {
        this.filterStudentProgress(e.target.value)
      })
    }
  }

  async loadDashboardData() {
    try {
      // Load dashboard statistics
      const stats = await this.fetchTutorStats()
      this.updateStats(stats)

      // Load recent activities
      const activities = await this.fetchRecentActivities()
      this.updateActivities(activities)

      // Load pending tasks
      const tasks = await this.fetchPendingTasks()
      this.updatePendingTasks(tasks)

      // Load student progress
      const progress = await this.fetchStudentProgress()
      this.updateStudentProgress(progress)
    } catch (error) {
      console.error("[v0] Error loading tutor dashboard data:", error)
    }
  }

  async fetchTutorStats() {
    try {
      return await window.EasyStudy.apiCall("/tutor/stats")
    } catch (error) {
      // Return demo data if API fails
      return {
        total_students: 45,
        total_videos: 28,
        pending_tasks: 12,
        avg_progress: 78,
      }
    }
  }

  async fetchRecentActivities() {
    try {
      return await window.EasyStudy.apiCall("/tutor/activities/recent")
    } catch (error) {
      // Return demo data if API fails
      return [
        {
          student_name: "John Smith",
          activity: "completed video",
          details: "Linear Equations",
          time: "2 hours ago",
          type: "completed",
        },
        {
          student_name: "Mary Johnson",
          activity: "submitted task",
          details: "Physics Problem Set 3",
          time: "4 hours ago",
          type: "submitted",
        },
        {
          student_name: "Robert Brown",
          activity: "started course",
          details: "Chemistry Basics",
          time: "1 day ago",
          type: "started",
        },
      ]
    }
  }

  async fetchPendingTasks() {
    try {
      return await window.EasyStudy.apiCall("/tutor/tasks/pending")
    } catch (error) {
      // Return demo data if API fails
      return [
        {
          id: 1,
          title: "Chemistry Lab Report",
          student_name: "Sarah Wilson",
          submitted_at: "2 hours ago",
          urgent: true,
        },
        {
          id: 2,
          title: "Math Problem Set 4",
          student_name: "David Lee",
          submitted_at: "1 day ago",
          urgent: false,
        },
        {
          id: 3,
          title: "Physics Quiz Answers",
          student_name: "Emma Davis",
          submitted_at: "2 days ago",
          urgent: false,
        },
      ]
    }
  }

  async fetchStudentProgress() {
    try {
      return await window.EasyStudy.apiCall("/tutor/students/progress")
    } catch (error) {
      // Return demo data if API fails
      return [
        {
          name: "Alice Miller",
          email: "alice.miller@email.com",
          progress: 85,
          status: "excellent",
        },
        {
          name: "Tom Wilson",
          email: "tom.wilson@email.com",
          progress: 65,
          status: "good",
        },
        {
          name: "Lisa Garcia",
          email: "lisa.garcia@email.com",
          progress: 35,
          status: "needs-attention",
        },
      ]
    }
  }

  updateStats(stats) {
    document.getElementById("totalStudents").textContent = stats.total_students || 0
    document.getElementById("totalVideos").textContent = stats.total_videos || 0
    document.getElementById("pendingTasks").textContent = stats.pending_tasks || 0
    document.getElementById("avgProgress").textContent = `${stats.avg_progress || 0}%`
  }

  updateActivities(activities) {
    // Activities are already rendered in HTML for demo
    // In production, this would dynamically update the activity list
    console.log("[v0] Activities loaded:", activities)
  }

  updatePendingTasks(tasks) {
    // Tasks are already rendered in HTML for demo
    // In production, this would dynamically update the task list
    console.log("[v0] Pending tasks loaded:", tasks)
  }

  updateStudentProgress(progress) {
    // Progress is already rendered in HTML for demo
    // In production, this would dynamically update the progress list
    console.log("[v0] Student progress loaded:", progress)
  }

  filterStudentProgress(filter) {
    // Implement progress filtering logic
    console.log("[v0] Filtering student progress by:", filter)
    // In production, this would filter the displayed students
  }

  async handleVideoUpload(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const videoData = {
      title: formData.get("videoTitle"),
      description: formData.get("videoDescription"),
      time_limit: formData.get("timeLimit"),
    }

    try {
      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Uploading..."
      submitBtn.disabled = true

      // Upload video file first
      const videoFile = formData.get("videoFile")
      if (videoFile) {
        const uploadFormData = new FormData()
        uploadFormData.append("video", videoFile)
        uploadFormData.append("title", videoData.title)
        uploadFormData.append("description", videoData.description)
        uploadFormData.append("time_limit", videoData.time_limit)

        const response = await window.EasyStudy.apiCall("/tutor/videos/upload", "POST", uploadFormData)

        if (response.success) {
          window.EasyStudy.showNotification("Video uploaded successfully!", "success")
          this.closeUploadModal()
          e.target.reset()
          // Refresh dashboard data
          this.loadDashboardData()
        }
      }
    } catch (error) {
      console.error("[v0] Video upload error:", error)
      window.EasyStudy.showNotification(error.message || "Failed to upload video", "error")
    } finally {
      const submitBtn = e.target.querySelector('button[type="submit"]')
      submitBtn.textContent = "Upload Video"
      submitBtn.disabled = false
    }
  }

  async handleSendReminder(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const reminderData = {
      recipients: formData.get("reminderRecipients"),
      subject: formData.get("reminderSubject"),
      message: formData.get("reminderMessage"),
    }

    try {
      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      const response = await window.EasyStudy.apiCall("/tutor/reminders/send", "POST", reminderData)

      if (response.success) {
        window.EasyStudy.showNotification("Reminder sent successfully!", "success")
        this.closeReminderModal()
        e.target.reset()
      }
    } catch (error) {
      console.error("[v0] Send reminder error:", error)
      window.EasyStudy.showNotification(error.message || "Failed to send reminder", "error")
    } finally {
      const submitBtn = e.target.querySelector('button[type="submit"]')
      submitBtn.textContent = "Send Reminder"
      submitBtn.disabled = false
    }
  }

  closeAllModals() {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.add("hidden")
    })
  }

  closeUploadModal() {
    document.getElementById("uploadModal").classList.add("hidden")
  }

  closeReminderModal() {
    document.getElementById("reminderModal").classList.add("hidden")
  }
}

// Global functions for modal management
function openUploadModal() {
  document.getElementById("uploadModal").classList.remove("hidden")
}

function closeUploadModal() {
  if (window.tutorDashboard) {
    window.tutorDashboard.closeUploadModal()
  }
}

function openReminderModal() {
  document.getElementById("reminderModal").classList.remove("hidden")
}

function closeReminderModal() {
  if (window.tutorDashboard) {
    window.tutorDashboard.closeReminderModal()
  }
}

function openTaskModal() {
  // Redirect to tasks page for creating new tasks
  window.location.href = "tasks.html?action=create"
}

function openTimerModal() {
  // Implement timer setting modal
  window.EasyStudy.showNotification("Timer setting feature coming soon!", "info")
}

function reviewTask(taskId) {
  // Redirect to task review page
  window.location.href = `tasks.html?review=${taskId}`
}

function downloadTask(taskId) {
  // Implement task download
  window.EasyStudy.showNotification("Downloading task...", "info")
  // In production, this would trigger a file download
}

// Initialize tutor dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  if (!window.EasyStudy.isAuthenticated()) {
    window.location.href = "../tutor-login.html"
    return
  }

  // Check user type
  if (window.EasyStudy.getUserType() !== "tutor") {
    window.location.href = "../student/dashboard.html"
    return
  }

  window.tutorDashboard = new TutorDashboard()
})

// Student Dashboard JavaScript
class StudentDashboard {
  constructor() {
    this.countdownInterval = null
    this.init()
  }

  init() {
    this.loadUserData()
    this.setupCountdownTimer()
    this.setupUserDropdown()
    this.setupTehillahChat()
    this.loadDashboardData()
  }

  loadUserData() {
    const user = window.EasyStudy.getCurrentUser()
    if (user) {
      document.getElementById("studentName").textContent = user.first_name || "Student"
      document.getElementById("userInitials").textContent = (user.first_name?.[0] || "") + (user.last_name?.[0] || "")
    }
  }

  async setupCountdownTimer() {
    try {
      const response = await window.EasyStudy.apiCall(window.API_CONFIG.ENDPOINTS.GET_DASHBOARD_DATA)
      const endTime = response.countdown_end_time
        ? new Date(response.countdown_end_time).getTime()
        : new Date().getTime() + 7 * 24 * 60 * 60 * 1000

      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime()
        const distance = endTime - now

        if (distance < 0) {
          clearInterval(this.countdownInterval)
          document.getElementById("countdownTimer").innerHTML = '<div class="timer-expired">Time Expired!</div>'
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        document.getElementById("days").textContent = days.toString().padStart(2, "0")
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
      }, 1000)
    } catch (error) {
      console.error("[v0] Error loading countdown:", error)
      // Fallback to demo countdown
      const endTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      this.countdownInterval = setInterval(() => {
        const now = new Date().getTime()
        const distance = endTime - now

        if (distance < 0) {
          clearInterval(this.countdownInterval)
          document.getElementById("countdownTimer").innerHTML = '<div class="timer-expired">Time Expired!</div>'
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        document.getElementById("days").textContent = days.toString().padStart(2, "0")
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0")
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0")
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0")
      }, 1000)
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

  setupTehillahChat() {
    const chatInput = document.getElementById("chatInput")
    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendTehillahMessage()
        }
      })
    }
  }

  async loadDashboardData() {
    try {
      const stats = await this.fetchDashboardStats()
      this.updateStats(stats)

      const activities = await this.fetchRecentActivities()
      this.updateActivities(activities)

      const tasks = await this.fetchUpcomingTasks()
      this.updateTasks(tasks)

      const courses = await this.fetchCourseProgress()
      this.updateCourseProgress(courses)
    } catch (error) {
      console.error("[v0] Error loading dashboard data:", error)
      window.EasyStudy.showNotification("Failed to load dashboard data", "error")
    }
  }

  async fetchDashboardStats() {
    try {
      const response = await window.EasyStudy.apiCall(window.API_CONFIG.ENDPOINTS.GET_DASHBOARD_DATA)
      return (
        response.stats || {
          videos_watched: 0,
          tasks_completed: 0,
          study_streak: 0,
          total_points: 0,
        }
      )
    } catch (error) {
      console.error("[v0] Error fetching stats:", error)
      return {
        videos_watched: 0,
        tasks_completed: 0,
        study_streak: 0,
        total_points: 0,
      }
    }
  }

  async fetchRecentActivities() {
    try {
      const response = await window.EasyStudy.apiCall("/dashboard/activities.php")
      return response.activities || []
    } catch (error) {
      console.error("[v0] Error fetching activities:", error)
      return []
    }
  }

  async fetchUpcomingTasks() {
    try {
      const response = await window.EasyStudy.apiCall(window.API_CONFIG.ENDPOINTS.GET_TASKS + "?status=upcoming")
      return response.tasks || []
    } catch (error) {
      console.error("[v0] Error fetching tasks:", error)
      return []
    }
  }

  async fetchCourseProgress() {
    try {
      const response = await window.EasyStudy.apiCall(window.API_CONFIG.ENDPOINTS.GET_PROGRESS)
      return response.courses || []
    } catch (error) {
      console.error("[v0] Error fetching progress:", error)
      return []
    }
  }

  updateStats(stats) {
    document.getElementById("videosWatched").textContent = stats.videos_watched || 0
    document.getElementById("tasksCompleted").textContent = stats.tasks_completed || 0
    document.getElementById("studyStreak").textContent = stats.study_streak || 0
    document.getElementById("totalPoints").textContent = (stats.total_points || 0).toLocaleString()
  }

  updateActivities(activities) {
    const activitiesContainer = document.querySelector(".activities-list")
    if (activitiesContainer && activities.length > 0) {
      activitiesContainer.innerHTML = activities
        .map(
          (activity) => `
        <div class="activity-item">
          <div class="activity-icon ${activity.type}">
            ${this.getActivityIcon(activity.type)}
          </div>
          <div class="activity-content">
            <p>${activity.description}</p>
            <span class="activity-time">${activity.time}</span>
          </div>
        </div>
      `,
        )
        .join("")
    }
  }

  updateTasks(tasks) {
    const tasksContainer = document.querySelector(".tasks-list")
    if (tasksContainer && tasks.length > 0) {
      tasksContainer.innerHTML = tasks
        .map(
          (task) => `
        <div class="task-item">
          <div class="task-priority ${task.priority}"></div>
          <div class="task-content">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <span class="task-due">Due: ${window.EasyStudy.formatDate(task.due_date)}</span>
          </div>
        </div>
      `,
        )
        .join("")
    }
  }

  updateCourseProgress(courses) {
    const coursesContainer = document.querySelector(".courses-list")
    if (coursesContainer && courses.length > 0) {
      coursesContainer.innerHTML = courses
        .map(
          (course) => `
        <div class="course-card">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${course.progress}%"></div>
          </div>
          <span class="progress-text">${course.progress}% Complete</span>
        </div>
      `,
        )
        .join("")
    }
  }

  getActivityIcon(type) {
    const icons = {
      video: "📹",
      task: "📝",
      chat: "💬",
      achievement: "🏆",
    }
    return icons[type] || "📋"
  }

  async sendTehillahMessage() {
    const input = document.getElementById("chatInput")
    const message = input.value.trim()

    if (!message) return

    // Add user message to chat
    this.addChatMessage(message, "user")
    input.value = ""

    try {
      const response = await window.EasyStudy.apiCall("/chat/tehillah.php", "POST", {
        message: message,
        context: "dashboard",
      })

      if (response.success && response.reply) {
        this.addChatMessage(response.reply, "tehillah")
      } else {
        // Fallback response
        const fallbackResponses = [
          "I'd be happy to help you with that! Can you provide more details?",
          "That's a great question! Let me think about the best way to explain this.",
          "Based on your progress, I recommend focusing on the fundamentals first.",
        ]
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
        this.addChatMessage(randomResponse, "tehillah")
      }
    } catch (error) {
      console.error("[v0] Error sending message to Tehillah:", error)
      this.addChatMessage("I'm having trouble connecting right now. Please try again later.", "tehillah")
    }
  }

  addChatMessage(message, sender) {
    const messagesContainer = document.getElementById("chatMessages")
    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${sender}`

    const avatar = sender === "user" ? "U" : "T"
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <p>${message}</p>
        <span class="message-time">${time}</span>
      </div>
    `

    messagesContainer.appendChild(messageDiv)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }
}

// Global functions for Tehillah chat
function openTehillahChat() {
  const chatWidget = document.getElementById("tehillahChat")
  chatWidget.classList.remove("hidden")
}

function closeTehillahChat() {
  const chatWidget = document.getElementById("tehillahChat")
  chatWidget.classList.add("hidden")
}

function sendTehillahMessage() {
  if (window.studentDashboard) {
    window.studentDashboard.sendTehillahMessage()
  }
}

// Initialize dashboard
document.addEventListener("DOMContentLoaded", () => {
  // Check authentication
  if (!window.EasyStudy.isAuthenticated()) {
    window.location.href = "../login.html"
    return
  }

  // Check user type
  if (window.EasyStudy.getUserType() !== "student") {
    window.location.href = "../tutor/dashboard.html"
    return
  }

  window.studentDashboard = new StudentDashboard()
})

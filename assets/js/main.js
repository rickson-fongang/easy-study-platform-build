// Main JavaScript file for EasyStudy Frontend
const API_CONFIG = {
  BASE_URL: "https://your-backend-domain.com/api",
  ENDPOINTS: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
}

class EasyStudy {
  constructor() {
    this.apiBaseUrl = API_CONFIG.BASE_URL
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupMobileMenu()
    this.setupSmoothScrolling()
  }

  // Event Listeners
  setupEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[v0] EasyStudy frontend initialized")
    })
  }

  // Mobile Menu Toggle
  setupMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle")
    const navLinks = document.querySelector(".nav-links")

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        mobileToggle.classList.toggle("active")
      })
    }
  }

  // Smooth Scrolling for Anchor Links
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  // API Helper Methods
  async apiCall(endpoint, method = "GET", data = null, isFormData = false) {
    const config = {
      method,
      headers: {},
    }

    if (data) {
      if (isFormData) {
        config.body = data
      } else {
        config.headers["Content-Type"] = "application/json"
        config.body = JSON.stringify(data)
      }
    }

    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, config)

      let result
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        result = await response.json()
      } else {
        const text = await response.text()
        result = { success: false, message: text }
      }

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`)
      }

      return result
    } catch (error) {
      console.error("[v0] API Error:", error)

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        this.showNotification("Connection error. Please check your internet connection.", "error")
      } else {
        this.showNotification(error.message || "An error occurred", "error")
      }

      throw error
    }
  }

  async login(email, password, userType = "student") {
    try {
      const response = await this.apiCall(API_CONFIG.ENDPOINTS.LOGIN, "POST", {
        email,
        password,
        user_type: userType,
      })

      if (response.success) {
        localStorage.setItem("authToken", response.token)
        localStorage.setItem("userType", userType)
        localStorage.setItem("userData", JSON.stringify(response.user))

        this.showNotification("Login successful!", "success")

        // Redirect based on user type
        setTimeout(() => {
          if (userType === "tutor") {
            window.location.href = "tutor/dashboard.html"
          } else {
            window.location.href = "student/dashboard.html"
          }
        }, 1000)
      }

      return response
    } catch (error) {
      throw error
    }
  }

  async register(userData) {
    try {
      const response = await this.apiCall(API_CONFIG.ENDPOINTS.REGISTER, "POST", userData)

      if (response.success) {
        this.showNotification("Registration successful! Please login.", "success")
      }

      return response
    } catch (error) {
      throw error
    }
  }

  async uploadFile(file, endpoint, additionalData = {}) {
    const formData = new FormData()
    formData.append("file", file)

    // Add additional data to form
    Object.keys(additionalData).forEach((key) => {
      formData.append(key, additionalData[key])
    })

    return await this.apiCall(endpoint, "POST", formData, true)
  }

  checkAuthOnLoad() {
    const token = localStorage.getItem("authToken")
    const userType = localStorage.getItem("userType")

    if (!token) {
      // Redirect to login if on protected pages
      const protectedPaths = ["/student/", "/tutor/"]
      const currentPath = window.location.pathname

      if (protectedPaths.some((path) => currentPath.includes(path))) {
        window.location.href = "/login.html"
      }
    }
  }

  // Authentication Methods
  logout() {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userType")
    localStorage.removeItem("userData")
    window.location.href = "index.html"
  }

  // Utility Methods
  showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.textContent = message

    // Add notification styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 6px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `

    // Set background color based on type
    const colors = {
      success: "#22c55e",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    }
    notification.style.backgroundColor = colors[type] || colors.info

    document.body.appendChild(notification)

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 5000)
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  formatTime(dateString) {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem("authToken") !== null
  }

  // Get current user data
  getCurrentUser() {
    const userData = localStorage.getItem("userData")
    return userData ? JSON.parse(userData) : null
  }

  // Get user type
  getUserType() {
    return localStorage.getItem("userType") || "student"
  }
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            border-top: 1px solid #e5e7eb;
        }
    }
`
document.head.appendChild(style)

// Initialize the application
const app = new EasyStudy()

// Export for use in other files
window.EasyStudy = app

document.addEventListener("DOMContentLoaded", () => {
  if (window.EasyStudy) {
    window.EasyStudy.checkAuthOnLoad()
  }
})

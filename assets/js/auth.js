// Authentication JavaScript
class AuthHandler {
  constructor() {
    this.init()
  }

  init() {
    this.setupFormHandlers()
    this.setupPasswordToggles()
    this.setupPasswordStrength()
    this.setupTehillahPopups()
  }

  setupFormHandlers() {
    // Student Login Form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", this.handleLogin.bind(this))
    }

    // Student Registration Form
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", this.handleRegister.bind(this))
    }

    // Tutor Login Form
    const tutorLoginForm = document.getElementById("tutorLoginForm")
    if (tutorLoginForm) {
      tutorLoginForm.addEventListener("submit", this.handleTutorLogin.bind(this))
    }
  }

  async handleLogin(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const email = formData.get("email")
    const password = formData.get("password")
    const rememberMe = formData.get("rememberMe")

    // Clear previous errors
    this.clearErrors()

    // Validate form
    if (!this.validateEmail(email)) {
      this.showError("emailError", "Please enter a valid email address")
      return
    }

    if (!password || password.length < 6) {
      this.showError("passwordError", "Password must be at least 6 characters")
      return
    }

    // Show loading state
    this.setLoadingState("loginBtn", true)

    try {
      const response = await window.EasyStudy.login(email, password, "student")

      if (response.success) {
        // Show Tehillah welcome popup
        this.showTehillahWelcome()

        // Redirect after popup closes
        setTimeout(() => {
          window.location.href = "student/dashboard.html"
        }, 3000)
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      window.EasyStudy.showNotification(error.message || "Login failed. Please try again.", "error")
    } finally {
      this.setLoadingState("loginBtn", false)
    }
  }

  async handleRegister(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const userData = {
      first_name: formData.get("firstName"),
      last_name: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirm_password: formData.get("confirmPassword"),
      user_type: "student",
    }

    // Clear previous errors
    this.clearErrors()

    // Validate form
    if (!this.validateRegistrationForm(userData)) {
      return
    }

    // Show loading state
    this.setLoadingState("registerBtn", true)

    try {
      const response = await window.EasyStudy.register(userData)

      if (response.success) {
        window.EasyStudy.showNotification(
          "Registration successful! Please check your email to verify your account.",
          "success",
        )

        // Show Tehillah guide popup
        this.showTehillahGuide()

        // Redirect to login after popup
        setTimeout(() => {
          window.location.href = "login.html"
        }, 5000)
      }
    } catch (error) {
      console.error("[v0] Registration error:", error)
      window.EasyStudy.showNotification(error.message || "Registration failed. Please try again.", "error")
    } finally {
      this.setLoadingState("registerBtn", false)
    }
  }

  async handleTutorLogin(e) {
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const email = formData.get("email")
    const password = formData.get("password")

    // Clear previous errors
    this.clearErrors()

    // Validate form
    if (!this.validateEmail(email)) {
      this.showError("emailError", "Please enter a valid email address")
      return
    }

    if (!password || password.length < 6) {
      this.showError("passwordError", "Password must be at least 6 characters")
      return
    }

    // Show loading state
    this.setLoadingState("tutorLoginBtn", true)

    try {
      const response = await window.EasyStudy.login(email, password, "tutor")

      if (response.success) {
        window.EasyStudy.showNotification("Welcome back! Redirecting to your dashboard...", "success")

        setTimeout(() => {
          window.location.href = "tutor/dashboard.html"
        }, 1500)
      }
    } catch (error) {
      console.error("[v0] Tutor login error:", error)
      window.EasyStudy.showNotification(error.message || "Login failed. Please try again.", "error")
    } finally {
      this.setLoadingState("tutorLoginBtn", false)
    }
  }

  validateRegistrationForm(userData) {
    let isValid = true

    // Name validation
    if (!userData.first_name || userData.first_name.length < 2) {
      this.showError("firstNameError", "First name must be at least 2 characters")
      isValid = false
    }

    if (!userData.last_name || userData.last_name.length < 2) {
      this.showError("lastNameError", "Last name must be at least 2 characters")
      isValid = false
    }

    // Email validation
    if (!this.validateEmail(userData.email)) {
      this.showError("emailError", "Please enter a valid email address")
      isValid = false
    }

    // Phone validation
    if (!this.validatePhone(userData.phone)) {
      this.showError("phoneError", "Please enter a valid phone number")
      isValid = false
    }

    // Password validation
    if (!userData.password || userData.password.length < 8) {
      this.showError("passwordError", "Password must be at least 8 characters")
      isValid = false
    }

    // Confirm password validation
    if (userData.password !== userData.confirm_password) {
      this.showError("confirmPasswordError", "Passwords do not match")
      isValid = false
    }

    // Terms agreement
    const agreeTerms = document.getElementById("agreeTerms")
    if (!agreeTerms.checked) {
      this.showError("agreeTermsError", "You must agree to the terms and conditions")
      isValid = false
    }

    return isValid
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validatePhone(phone) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  setupPasswordToggles() {
    const toggles = document.querySelectorAll(".password-toggle")

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        const input = e.target.closest(".password-input").querySelector("input")
        const isPassword = input.type === "password"

        input.type = isPassword ? "text" : "password"

        // Update icon
        const svg = toggle.querySelector("svg")
        if (isPassword) {
          svg.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          `
        } else {
          svg.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          `
        }
      })
    })
  }

  setupPasswordStrength() {
    const passwordInput = document.getElementById("password")
    const strengthBar = document.querySelector(".strength-fill")
    const strengthText = document.querySelector(".strength-text")

    if (passwordInput && strengthBar) {
      passwordInput.addEventListener("input", (e) => {
        const password = e.target.value
        const strength = this.calculatePasswordStrength(password)

        strengthBar.className = `strength-fill ${strength.level}`
        strengthText.textContent = `Password strength: ${strength.text}`
      })
    }
  }

  calculatePasswordStrength(password) {
    let score = 0

    if (password.length >= 8) score += 1
    if (password.match(/[a-z]/)) score += 1
    if (password.match(/[A-Z]/)) score += 1
    if (password.match(/[0-9]/)) score += 1
    if (password.match(/[^a-zA-Z0-9]/)) score += 1

    const levels = {
      0: { level: "weak", text: "Very Weak" },
      1: { level: "weak", text: "Weak" },
      2: { level: "fair", text: "Fair" },
      3: { level: "good", text: "Good" },
      4: { level: "strong", text: "Strong" },
      5: { level: "strong", text: "Very Strong" },
    }

    return levels[score] || levels[0]
  }

  setupTehillahPopups() {
    // Close Tehillah welcome popup
    const closeTehillah = document.getElementById("closeTehillah")
    if (closeTehillah) {
      closeTehillah.addEventListener("click", () => {
        this.hideTehillahWelcome()
      })
    }

    // Close Tehillah guide popup
    const closeTehillahGuide = document.getElementById("closeTehillahGuide")
    if (closeTehillahGuide) {
      closeTehillahGuide.addEventListener("click", () => {
        this.hideTehillahGuide()
      })
    }
  }

  showTehillahWelcome() {
    const popup = document.getElementById("tehillahWelcome")
    if (popup) {
      popup.classList.remove("hidden")
    }
  }

  hideTehillahWelcome() {
    const popup = document.getElementById("tehillahWelcome")
    if (popup) {
      popup.classList.add("hidden")
    }
  }

  showTehillahGuide() {
    const popup = document.getElementById("tehillahGuide")
    if (popup) {
      popup.classList.remove("hidden")
    }
  }

  hideTehillahGuide() {
    const popup = document.getElementById("tehillahGuide")
    if (popup) {
      popup.classList.add("hidden")
    }
  }

  setLoadingState(buttonId, loading) {
    const button = document.getElementById(buttonId)
    const btnText = button.querySelector(".btn-text")
    const btnLoader = button.querySelector(".btn-loader")

    if (loading) {
      button.disabled = true
      btnText.style.opacity = "0"
      btnLoader.classList.remove("hidden")
    } else {
      button.disabled = false
      btnText.style.opacity = "1"
      btnLoader.classList.add("hidden")
    }
  }

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId)
    if (errorElement) {
      errorElement.textContent = message
    }
  }

  clearErrors() {
    const errorElements = document.querySelectorAll(".form-error")
    errorElements.forEach((element) => {
      element.textContent = ""
    })
  }
}

// Initialize authentication handler
document.addEventListener("DOMContentLoaded", () => {
  new AuthHandler()
})

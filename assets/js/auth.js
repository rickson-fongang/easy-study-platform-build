// EasyStudy Authentication Handler
class EasyStudyAuth {
  constructor(apiBaseUrl = window.API_CONFIG.BASE_URL) {
    this.apiBaseUrl = apiBaseUrl; 
    this.init();
  }

  init() {
    this.setupFormHandlers();
    this.setupPasswordToggles();
    this.setupPasswordStrength();
  }

  setupFormHandlers() {
    // Student Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", this.handleLogin.bind(this));

    // Student Registration
    const registerForm = document.getElementById("registerForm");
    if (registerForm) registerForm.addEventListener("submit", this.handleRegister.bind(this));

    // Tutor Login
    const tutorLoginForm = document.getElementById("tutorLoginForm");
    if (tutorLoginForm) tutorLoginForm.addEventListener("submit", this.handleTutorLogin.bind(this));
  }

  async handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    this.clearErrors();
    if (!this.validateEmail(email)) return this.showError("emailError", "Enter a valid email");
    if (!password) return this.showError("passwordError", "Enter password");

    this.setLoading("loginBtn", true);

    try {
      const response = await this.apiRequest(window.API_CONFIG.ENDPOINTS.LOGIN, { email, password });
      if (response.success) {
        localStorage.setItem("es_token", response.token);
        localStorage.setItem("es_user", JSON.stringify(response.user));

        // ✅ React/Next.js routing
        const dashboardPath = response.user.user_type === "tutor" 
          ? "/app/tutor/dashboard" 
          : "/app/student/dashboard";

        window.location.href = dashboardPath;
      } else {
        this.showError("loginError", response.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      this.showError("loginError", "Server error. Try again later.");
    } finally {
      this.setLoading("loginBtn", false);
    }
  }

  async handleTutorLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    this.clearErrors();
    if (!this.validateEmail(email)) return this.showError("emailError", "Enter a valid email");
    if (!password) return this.showError("passwordError", "Enter password");

    this.setLoading("tutorLoginBtn", true);

    try {
      const response = await this.apiRequest(window.API_CONFIG.ENDPOINTS.LOGIN, { email, password });
      if (response.success && response.user.user_type === "tutor") {
        localStorage.setItem("es_token", response.token);
        localStorage.setItem("es_user", JSON.stringify(response.user));
        window.location.href = "/app/tutor/dashboard";
      } else {
        this.showError("loginError", response.message || "Tutor login failed");
      }
    } catch (err) {
      console.error(err);
      this.showError("loginError", "Server error. Try again later.");
    } finally {
      this.setLoading("tutorLoginBtn", false);
    }
  }

  async handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const userData = {
      first_name: form.firstName.value.trim(),
      last_name: form.lastName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
      confirm_password: form.confirmPassword.value.trim(),
      user_type: "student",
    };

    this.clearErrors();
    if (!this.validateRegistration(userData)) return;

    this.setLoading("registerBtn", true);

    try {
      const response = await this.apiRequest(window.API_CONFIG.ENDPOINTS.REGISTER, userData);
      if (response.success) {
        alert("Registration successful! Redirecting to login...");
        setTimeout(() => window.location.href = "/app/login", 2000);
      } else {
        this.showError("registerError", response.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      this.showError("registerError", "Server error. Try again later.");
    } finally {
      this.setLoading("registerBtn", false);
    }
  }

  // --- validation, error, utility methods stay unchanged ---

  validateRegistration(data) {
    let valid = true;
    if (!data.first_name || data.first_name.length < 2) {
      this.showError("firstNameError", "First name must be at least 2 chars");
      valid = false;
    }
    if (!data.last_name || data.last_name.length < 2) {
      this.showError("lastNameError", "Last name must be at least 2 chars");
      valid = false;
    }
    if (!this.validateEmail(data.email)) {
      this.showError("emailError", "Invalid email");
      valid = false;
    }
    if (!data.password || data.password.length < 6) {
      this.showError("passwordError", "Password must be at least 6 chars");
      valid = false;
    }
    if (data.password !== data.confirm_password) {
      this.showError("confirmPasswordError", "Passwords do not match");
      valid = false;
    }
    return valid;
  }

  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  setLoading(buttonId, isLoading) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;
    btn.disabled = isLoading;
    btn.querySelector(".btn-text")?.classList.toggle("hidden", isLoading);
    btn.querySelector(".btn-loader")?.classList.toggle("hidden", !isLoading);
  }

  showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  clearErrors() {
    document.querySelectorAll(".form-error").forEach(el => el.textContent = "");
  }

  setupPasswordToggles() {
    document.querySelectorAll(".password-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const input = toggle.closest(".password-input").querySelector("input");
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
      });
    });
  }

  setupPasswordStrength() {
    const pwdInput = document.getElementById("password");
    const strengthFill = document.querySelector(".strength-fill");
    const strengthText = document.querySelector(".strength-text");

    if (!pwdInput || !strengthFill || !strengthText) return;

    pwdInput.addEventListener("input", e => {
      const pwd = e.target.value;
      let score = 0;
      if (pwd.length >= 6) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^a-zA-Z0-9]/.test(pwd)) score++;

      const levels = ["Very Weak","Weak","Fair","Good","Strong","Very Strong"];
      const classes = ["very-weak","weak","fair","good","strong","very-strong"];
      const idx = Math.min(score, 5);

      strengthFill.className = `strength-fill ${classes[idx]}`;
      strengthText.textContent = `Password strength: ${levels[idx]}`;
    });
  }

  async apiRequest(endpoint, data) {
    const res = await fetch(this.apiBaseUrl + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  new EasyStudyAuth();
});

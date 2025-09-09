// API Configuration for EasyStudy Platform
const API_CONFIG = {
  // Update this URL to your railway subdomain
  BASE_URL: "https://easystudy-api-production.up.railway.app",
  // Example: src/config.js


  // API Endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: "/auth/login.php",
    REGISTER: "/auth/register.php",
    LOGOUT: "/auth/logout.php",

    // Users
    GET_PROFILE: "/users/profile.php",
    UPDATE_PROFILE: "/users/update.php",
    GET_STUDENTS: "/users/students.php",

    // Videos
    UPLOAD_VIDEO: "/videos/upload.php",
    GET_VIDEOS: "/videos/list.php",
    DELETE_VIDEO: "/videos/delete.php",
    UPDATE_VIDEO: "/videos/update.php",

    // Tasks
    CREATE_TASK: "/tasks/create.php",
    GET_TASKS: "/tasks/list.php",
    SUBMIT_TASK: "/tasks/submit.php",
    UPDATE_TASK: "/tasks/update.php",

    // Chat
    SEND_MESSAGE: "/chat/send.php",
    GET_MESSAGES: "/chat/messages.php",

    // Dashboard
    GET_DASHBOARD_DATA: "/dashboard/data.php",
    GET_PROGRESS: "/dashboard/progress.php",
  },

  // Request timeout in milliseconds
  TIMEOUT: 30000,

  // File upload limits
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/ogg"],
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
}

// Export configuration
window.API_CONFIG = API_CONFIG

// API Configuration for EasyStudy Platform
const API_CONFIG = {
  // Update this URL to your railway subdomain
  BASE_URL: "https://easystudy-api-production.up.railway.app",

  // API Endpoints (FIXED - removed .php extensions)
  ENDPOINTS: {
    // Authentication
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",

    // Users
    GET_PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/update", 
    GET_STUDENTS: "/users/students",

    // Videos
    UPLOAD_VIDEO: "/videos/upload",
    GET_VIDEOS: "/videos/list",
    DELETE_VIDEO: "/videos/delete",
    UPDATE_VIDEO: "/videos/update",

    // Tasks
    CREATE_TASK: "/tasks/create",
    GET_TASKS: "/tasks/list",
    SUBMIT_TASK: "/tasks/submit",
    UPDATE_TASK: "/tasks/update",

    // Chat
    SEND_MESSAGE: "/chat/send",
    GET_MESSAGES: "/chat/messages",

    // Dashboard
    GET_DASHBOARD_DATA: "/dashboard/data",
    GET_PROGRESS: "/dashboard/progress",
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

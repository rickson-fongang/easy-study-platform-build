# EasyStudy Platform - Study with Rickson Fongang

A comprehensive learning management system built with HTML, CSS, JavaScript (frontend) and PHP (backend) for split hosting architecture.

## 🎨 Design Features

- **Primary Color**: Blue (#3b82f6) - Professional and trustworthy
- **Slogan**: "Study with Rickson Fongang" - Personalized branding
- **Responsive Design**: Mobile-first approach with breakpoints
- **AI Assistant**: Tehillah integration throughout the platform
- **Clean Typography**: Inter font family for modern readability

## 🏗️ Architecture

### Frontend (Netlify)
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom design system with CSS variables
- **Vanilla JavaScript**: No framework dependencies
- **Responsive**: Mobile-first design with flexbox/grid

### Backend (InfinityFree)
- **PHP 7.4+**: Server-side logic and API endpoints
- **MySQL**: Database for user data, videos, tasks, chat
- **JWT Authentication**: Secure token-based auth
- **File Upload**: Video and document handling

## 📁 Project Structure

\`\`\`
easystudy-platform/
├── Frontend
│   ├── index.html                 # Landing page
│   ├── login.html                 # Student login
│   ├── register.html              # Student registration
│   ├── tutor-login.html           # Tutor login
│   ├── student/
│   │   └── dashboard.html         # Student dashboard
│   ├── tutor/
│   │   └── dashboard.html         # Tutor dashboard
│   └── assets/
│       ├── css/
│       │   ├── styles.css         # Main styles
│       │   ├── auth.css           # Authentication styles
│       │   ├── dashboard.css      # Dashboard styles
│       │   └── tutor.css          # Tutor styles
│       └── js/
│           ├── config.js          # API configuration
│           ├── main.js            # Core functionality
│           ├── auth.js            # Authentication logic
│           ├── student-dashboard.js
│           └── tutor-dashboard.js
│
└── Backend (Deploy to InfinityFree)
    ├── api/
    │   ├── config/
    │   │   ├── database.php       # DB connection
    │   │   └── config.php         # App config
    │   ├── classes/
    │   │   ├── Auth.php           # Authentication class
    │   │   ├── User.php           # User management
    │   │   ├── Video.php          # Video handling
    │   │   └── Task.php           # Task management
    │   ├── auth/
    │   │   ├── login.php          # Login endpoint
    │   │   └── register.php       # Registration endpoint
    │   ├── videos/
    │   │   ├── upload.php         # Video upload
    │   │   └── list.php           # Video listing
    │   └── database/
    │       └── schema.sql         # Database schema
    └── uploads/                   # File storage
\`\`\`

## 🚀 Deployment Instructions

### Step 1: Frontend Deployment (Netlify)

1. **Prepare Frontend Files**:
   - Upload all HTML, CSS, JS files to Netlify
   - Ensure `assets/` folder structure is maintained

2. **Update API Configuration**:
   \`\`\`javascript
   // In assets/js/config.js
   BASE_URL: "https://yoursite.infinityfreeapp.com/api"
   \`\`\`

3. **Deploy to Netlify**:
   - Drag and drop files to Netlify dashboard
   - Or connect GitHub repository for automatic deployments

### Step 2: Backend Deployment (InfinityFree)

1. **Upload PHP Files**:
   - Upload `api/` folder to your InfinityFree public_html directory
   - Ensure proper folder structure is maintained

2. **Database Setup**:
   \`\`\`sql
   -- Run the schema.sql file in your MySQL database
   -- Update database credentials in api/config/database.php
   \`\`\`

3. **Configure CORS**:
   \`\`\`apache
   # Add to .htaccess in api/ folder
   Header always set Access-Control-Allow-Origin "https://your-netlify-site.netlify.app"
   Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
   Header always set Access-Control-Allow-Headers "Content-Type, Authorization"
   \`\`\`

4. **Update Configuration**:
   \`\`\`php
   // In api/config/config.php
   define('FRONTEND_URL', 'https://your-netlify-site.netlify.app');
   define('JWT_SECRET', 'your-secure-secret-key');
   \`\`\`

## ✨ Key Features

### Student Features
- ✅ Registration and login with validation
- ✅ Personalized dashboard with progress tracking
- ✅ Video tutorials with progress tracking
- ✅ Task submission system
- ✅ Chat with other students and tutors
- ✅ Tehillah AI assistant integration
- ✅ Profile management
- ✅ Countdown timer for time-limited access

### Tutor Features
- ✅ Admin dashboard with student management
- ✅ Video upload and management
- ✅ Task creation and review system
- ✅ Student progress monitoring
- ✅ Chat system with students
- ✅ Time limit controls for student access
- ✅ Student approval/rejection system

### Technical Features
- ✅ JWT-based authentication
- ✅ File upload handling
- ✅ Responsive design (mobile-first)
- ✅ Real-time form validation
- ✅ Loading states and error handling
- ✅ Cross-origin resource sharing (CORS)
- ✅ SQL injection protection
- ✅ Password hashing and security

## 🎯 Customization

### Colors
Update CSS variables in `assets/css/styles.css`:
\`\`\`css
:root {
  --primary: #3b82f6;        /* Blue primary */
  --primary-dark: #2563eb;   /* Darker blue */
  --primary-light: #60a5fa;  /* Lighter blue */
}
\`\`\`

### Branding
- Update "Study with Rickson Fongang" throughout HTML files
- Replace logo/brand elements as needed
- Customize Tehillah AI assistant messages

## 🔧 Configuration Checklist

- [ ] Update API base URL in `assets/js/config.js`
- [ ] Configure database credentials in `api/config/database.php`
- [ ] Set JWT secret in `api/config/config.php`
- [ ] Add CORS headers in `.htaccess`
- [ ] Test all authentication flows
- [ ] Verify file upload functionality
- [ ] Test responsive design on mobile devices

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛡️ Security Features

- Password hashing with PHP password_hash()
- JWT token authentication
- SQL prepared statements
- Input validation and sanitization
- CORS protection
- File upload restrictions
- Session management

## 📞 Support

For technical support or customization requests, refer to the deployment instructions or check the browser console for debugging information.

---

**Built with ❤️ for effective learning management**

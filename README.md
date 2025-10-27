# 🎓 NexLearn Frontend

**Project Name:** NexLearn  

**Admin Login:**  
- Email: `sourob2356@gmail.com`  
- Password: `123456`
  
**Tutor Login:**  
- Email: `faisal@gmail.com`  
- Password: `123456`

**Student Login:**  
- Email: `karim@gmail.com`  
- Password: `123456`
  
**Live URL:** _[https://nextlearn25.netlify.app]_
**Server source code:** _[https://github.com/asrafulsgit/NexLearn-server]_

---

## 🌟 Overview

NexLearn is a modern frontend application built with **React** and **Tailwind CSS**, serving as the primary interface for students, tutors, and administrators. It communicates with the NexLearn backend for features like authentication, session booking, note management, and more.

---

## 🚀 Key Features

### 🔐 User Authentication
- Students, Tutors, and Admins can register and log in.
- Google OAuth login support via Firebase.

### 📚 Study Sessions
- List all available sessions with:
  - Search by title or tutor
  - Filter by subject/category
  - Pagination
- **Booking Logic**:
  - If session is **free**, student can **book immediately**.
  - If session is **paid**, student must **pay via Stripe** to confirm booking.
- View session details, including tutor info, reviews, and description.
- Add a review after attending a session.

### 👨‍🏫 Tutors
- Browse and filter tutors by name or subject.
- View tutor profiles and sessions.

### 🧑‍🎓 Student Dashboard
- See list of booked sessions
- Add, update, delete personal notes
- Access and download study materials

### 🧑‍🏫 Tutor Dashboard
- Create new sessions with details and price
- Manage own sessions (update or delete)
- Upload/view/delete materials for sessions

### 🛠️ Admin Dashboard
- Manage users (students, tutors, admins)
- Approve, reject, edit, or delete any session
- View and delete uploaded materials
- Approve or reject tutor account requests

### 🌐 Additional Pages
- **Landing Page** with:
  - Hero banner
  - Featured Study Sessions
  - What You Can Do with NexLearn
  - Why Choose NexLearn
  - How It Works
  - Footer with navigation
- **Static Content Pages**:
  - About
  - Contact
  - FAQ
  - Privacy Policy
  - Terms & Conditions
  - Accessibility
- **404 Not Found Page**:
  - Friendly not found image
  - "Go Home" button for navigation

---

## 🛠️ Getting Started

### 1. Clone the Repository
```bash
git clone 
cd nexlearn/client
Install dependencies

bash
npm install
```
```env
Configure environment variables
Create .env with:

VITE_FIREBASE_APIKEY =  ''
VITE_FIREBASE_AUTHDOMAIN = '' 
VITE_FIREBASE_PROJECTID =  ''
VITE_FIREBASE_MESSAGINGSENDERID =  ''
VITE_FIREBASE_STORAGEBUCKET =  ''
VITE_FIREBASE_APPID =  ''
VITE_PUBLISHABLE_KEY = ' '

VITE_BACKEND_URL = ''
```

```bash
npm run dev
```



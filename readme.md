# 📝 Online Exam System (Backend)

A full-featured backend for an online exam system built with **Node.js**, **Express**, and **MongoDB**. It supports user authentication, exam creation and participation, real-time notifications via Socket.IO, role-based access control, and more.

## 🚀 Features

### 👥 Authentication
- User registration & login
- Roles: `admin`, `student`
- Department assignment (e.g., `mearn`, `dotnet`, `python`)

### 🧪 Exams Module
- Admins/teachers can:
  - Create, update, delete exams
  - Set department, schedule, and duration
  - Notify students of new exams in their department
- Students can:
  - View available exams for their department

### ❓ Questions Module
- Admins can:
  - Create, update, delete questions linked to exams
- Students:
  - Retrieve exam questions (without correct answers)

### ✅ Submissions
- Students can:
  - Start and submit exams
  - Submit answers, get auto-scored with percentage
- Admins can:
  - View all submissions per exam
- Students:
  - View personal submission history

### 🔔 Notifications
- Sent to:
  - All students in a department when a new exam is created
  - The exam creator when a student submits
- Real-time support using **Socket.IO**

### 📦 Validation Layer
- Express-validator used for:
  - Signup/Login
  - Exam creation/update
  - More coming soon...

---

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **Socket.IO** (Real-time notifications)
- **JWT** for Auth
- **Express-validator**
- **RESTful API structure**

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/online-exam-system-backend.git
cd online-exam-system-backend

npm install

### 3. Set Environment Variables

Create a `config.env` file in the root directory and add your environment variables:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

# 📅 ScheduleLand

ScheduleLand is a full-stack productivity app that helps users create, edit, and manage daily events and routines. Built with React, Node.js, Express, and MongoDB, it features secure authentication, a clean UI, and full CRUD functionality.

---

## 🚀 Live Demo

Coming soon…

---

## ✨ Features

- ✅ User registration and login (JWT-authenticated)
- ✅ Create, edit, and delete events
- ✅ Protected routes and dashboards
- ✅ Responsive and modern design
- ✅ Frontend built with React
- ✅ Backend powered by Express + MongoDB

---

## 🔧 Tech Stack

**Frontend:**
- React
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt for auth

**Dev Tools:**
- Postman
- Vercel / Render (for deployment)

---

## 🚀 Getting Started

### 📦 Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend folder with:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

### 💻 Frontend

```bash
cd frontend
npm install
npm start
```

---

## 📡 API Endpoints

| Method | Route | Description |
|--------|--------------------|----------------------|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login user |
| GET | /api/events | Get all user events |
| POST | /api/events | Create event |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |

---

## 👤 Author

Made by [Your Name](https://github.com/yourusername)

---

## 📄 License

MIT License

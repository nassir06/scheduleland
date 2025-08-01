# 📅 ScheduleLand

ScheduleLand is a full-stack productivity app that helps users create, edit, and manage daily events and routines. Built with React, Node.js, Express, and MongoDB, it features secure authentication, a clean UI, and full CRUD functionality.

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

Made by Nassir Mohammed(https://github.com/nassir06)

---

## 📄 License

MIT License

Copyright (c) 2025 Nassir Mohammed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

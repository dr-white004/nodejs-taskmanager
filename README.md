# Task Manager Application (Full-Stack)

A professional task management system built with **Node.js (Express + Prisma)** and **React (Vite)**. This project demonstrates CRUD operations, Role-Based Access Control (RBAC), and automatic activity logging.

## 🚀 Live Demonstration
- **Frontend Dashboard**: [https://nodejs-taskmanager.vercel.app](https://nodejs-taskmanager.vercel.app)
- **Backend API Health**: [https://nodejs-taskmanager.onrender.com/health](https://nodejs-taskmanager.onrender.com/health)

---

## 🏗️ Architecture & Features
- **Monorepo Structure**: Contains both `/backend` and `/frontend` in one repository.
- **Production DB**: PostgreSQL (hosted on Render).
- **Local DB**: SQLite (ready for zero-config local testing).
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can create, edit, delete, and view all tasks. Has exclusive access to the **Activity Log**.
  - **User**: Can view and edit task details or mark them as complete.
- **Automatic Logging**: Every action (Registration, Login, Task Creation/Deletion) is logged to the `ActivityLog` table.
- **Secure Auth**: JWT-based authentication with bcrypt password hashing.

---

## 🛠️ Local Development Setup

### 1. Backend Setup
1.  Navigate to the `backend` folder: `cd backend`
2.  Install dependencies: `npm install`
3.  Configure your `.env` file (copy from `.env.example`):
    ```env
    DATABASE_URL="file:./dev.db" # Default for local SQLite
    JWT_SECRET="your-secret-key"
    ADMIN_SECRET="REVOCUBE_ADMIN_2025"
    PORT=5000
    ```
4.  **Database Toggle (SQLite vs Postgres)**:
    - By default, the `schema.prisma` is set to `postgresql` for the live site.
    - **To test locally with SQLite**: Change `provider = "postgresql"` to `provider = "sqlite"` in `prisma/schema.prisma`.
5.  Initialize DB: `npx prisma generate && npx prisma db push`
6.  Start Server: `npm run dev`

### 2. Frontend Setup
1.  Navigate to the `frontend` folder: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start React: `npm run dev` (Connects to `http://localhost:5000/api` by default).

---

## 🔑 Registration Rules & Secrets
- **Admin Registration**: To gain Admin privileges, select "Admin" in the registration form and provide the secret code: **`REVOCUBE_ADMIN_2025`**.
- **User Role**: Standard registration defaults to the "User" role with restricted permissions.


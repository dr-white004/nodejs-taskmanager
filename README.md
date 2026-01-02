# Task Manager Application

A full-stack task management system built with Node.js (Express + Prisma) and React.

## Features
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Can create, edit, delete, and view all tasks. Can also view the Activity Log.
  - **User**: Can edit and complete tasks, but cannot delete them or create new ones.
- **Activity Log**: Automatically tracks every task-related action (Admin only).
- **Secure Auth**: JWT-based authentication with a specific `ADMIN_SECRET` required for Admin registration.

## Tech Stack
- **Backend**: Node.js, Express, Prisma (ORM), SQLite, JWT, Bcrypt.js.
- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Axios.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### 1. Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`:
   ```env
   # PostgreSQL Connection String (Use Render/Supabase/Neon)
   DATABASE_URL="postgresql://user:password@localhost:5432/taskdb"
   JWT_SECRET="super-secret-key-for-interview"
   ADMIN_SECRET="REVOCUBE_ADMIN_2025"
   PORT=5000
   ```
4. Initialize the database and Generate Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Start the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the React app: `npm run dev`

## Registration Rules
- To register as an **Admin**, you MUST provide the `ADMIN_SECRET` defined in the backend `.env` file (default: `REVOCUBE_ADMIN_2025`).
- Normal registration defaults to the **User** role.

## Submission
- GitHub Repository link sent to HR.

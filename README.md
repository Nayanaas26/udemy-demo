# EduLMS - Full Stack MERN Learning Management System

A complete full-stack Learning Management System built from scratch with the MERN stack with modern UI and modular architecture.

## Tech Stack
- **Frontend**: React.js, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Video Embed**: YouTube IFrames
- **State Management**: React Hooks
- **HTTP Client**: Axios

## Features
- Modern UI Design (Coursera/Udemy style)
- Authentication (Login/Signup with JWT)
- Detailed Course Navigation
- Learning Dashboard with embedded YouTube player (no local video storage)
- Dynamic Course Progress Tracking
- Course Cards and Sidebar content organization.
- Smooth Hover Effects & Dark Mode Theme.

## Project Structure
- `/client`: Frontend Code (React VITE)
- `/server`: Backend Code (Node.js, Express, MongoDB)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally, or a remote MongoURI.

### Server Setup (Backend)

1. Open a terminal and navigate to `server/`:
   ```bash
   cd lms-project/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your MongoDB Database string. Currently, we use the local default in `.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/lms-project
   ```
4. Run the database seed script to get some initial courses:
   ```bash
   node seed.js
   ```
   *Available login accounts in DB:*
   - `student@example.com` / `password123`
   - `instructor@example.com` / `password123`
5. Start the backend Node server:
   ```bash
   node server.js
   ```

### Client Setup (Frontend)

1. Open a new terminal and navigate to `client/`:
   ```bash
   cd lms-project/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

This will launch your Vite server, and you'll be able to interact with the LMS on `http://localhost:5173`.

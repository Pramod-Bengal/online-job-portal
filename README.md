# Online Job Portal Management System

A premium, full-stack recruitment platform built with modern technologies, featuring a high-fidelity dark-themed UI and sophisticated recruitment workflows.

## 🚀 Tech Stack

### Frontend
- **Framework**: Angular 21 (Latest)
- **Language**: TypeScript
- **Styling**: SCSS (Modern Dark Glassmorphism Design)
- **State Management**: RxJS & Signals
- **Icons**: Custom SVG Component Library

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas/Local)
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **Protocol**: RESTful API

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/)

### 1. Database Setup
1. Create a MongoDB database (Atlas or Local).
2. Create a `.env` file in the `server` directory.
3. Add your `MONGODB_URI`, `JWT_SECRET`, and `PORT`.

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000` (by default).

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```
The application will be available at `http://localhost:4200`.

---

## 🌐 Deployment (Render)

This project is configured for easy deployment on [Render](https://render.com/).

### Backend Deployment
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set **Root Directory** to `server`.
4. Set **Build Command** to `npm install`.
5. Set **Start Command** to `node index.js`.
6. Add **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for JWT.

### Frontend Deployment
1. Create a new **Static Site** on Render.
2. Connect your GitHub repository.
3. Set **Root Directory** to `client`.
4. Set **Build Command** to `npm install && npm run build`.
5. Set **Publish Directory** to `dist/client/browser`. (Verify this after build)
6. Add **Redirect/Rewrite** rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

---

## 💎 Key Features

- **Premium Dark UI**: Inspired by high-end Dribbble designs with glassmorphism and smooth animations.
- **Smart Dashboard**: Visualizes job search progress with interactive stats and trend indicators.
- **Multi-step Job Posting**: Guided workflow for employers to create high-quality listings.
- **Quick Apply**: Seamless application process for candidates.
- **Dynamic Search**: Filter jobs by location, salary, and job type with real-time updates.

---

## 📂 Project Structure

```text
├── client/                # Angular Frontend
│   ├── src/
│   │   ├── app/           # Components, Pages, Services
│   │   ├── environments/  # Environment configs (Prod/Dev)
│   │   └── styles.scss    # Global design system
├── server/                # Express Backend
│   ├── config/            # DB Configuration (MongoDB)
│   ├── routes/            # API Endpoints
│   ├── models/            # Database Models (Mongoose)
│   └── index.js           # Server Entry Point
└── render.yaml            # Blueprint deployment config
```

---

## 📜 License
This project is for educational and portfolio purposes.

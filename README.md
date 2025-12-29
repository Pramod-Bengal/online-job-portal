# Online Job Portal Management System

A premium, full-stack recruitment platform built with modern technologies, featuring a high-fidelity dark-themed UI and sophisticated recruitment workflows.

## 🚀 Tech Stack

### Frontend
- **Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: SCSS (Modern Dark Glassmorphism Design)
- **Icons**: Custom SVG Component Library
- **Typography**: Outfit & Inter (Google Fonts)

### Backend
- **Environment**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens) with Bcrypt password hashing
- **Protocol**: RESTful API

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MySQL](https://www.mysql.com/)

### 1. Database Setup
1. Create a database named `job_portal`.
2. Update the database credentials in `server/.env`.

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
│   │   └── styles.scss    # Global design system
├── server/                # Express Backend
│   ├── config/            # DB Configuration
│   ├── routes/            # API Endpoints
│   └── models/            # Database Models
└── README.md              # Main Documentation
```

---

## 📜 License
This project is for educational and portfolio purposes.

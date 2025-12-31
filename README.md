# 🎥 Clueso Clone — Video to Step-by-Step Documentation Generator

A full-stack application that converts **screen-recorded videos into structured, step-by-step documentation with screenshots**, inspired by tools like **Clueso**.
This project demonstrates **real-world product engineering**, including background processing, media handling, AI-powered transcription, and a clean editor experience.

---

## 📌 Repository Structure
```bash
clueso-clone/
├── backend/
│   ├── src/
│   │   ├── controllers/   # API request handlers
│   │   ├── routes/        # Express route definitions
│   │   ├── services/      # FFmpeg, Whisper, AI logic
│   │   ├── models/        # Mongoose schemas
│   │   └── app.js         # Express app entry point
│   └── uploads/
│       └── screenshots/   # Generated screenshots (per project)
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route-level pages
│   │   ├── services/      # API layer (Axios)
│   │   └── App.jsx        # App root
│
└── README.md
```

---

## 🚀 What This Application Does

1. User uploads a screen-recorded video  
2. Project is created immediately (non-blocking UX)  
3. Background processing starts:
   - Screenshot extraction using FFmpeg
   - Audio extraction
   - Speech-to-text using Whisper (local)
4. Transcript is converted into structured steps  
5. Screenshots are grouped per step  
6. Editor displays:
   - Step-by-step documentation
   - Screenshots per step
   - Full transcript panel

---

## 🧠 Architecture Overview

### High-Level Flow

```bash
User Uploads Video
↓
Project Created Instantly
↓
Background Processing
├─ Screenshot Extraction (FFmpeg)
├─ Audio Extraction
└─ Transcription (Whisper)
↓
Transcript → Structured Steps
↓
Editor UI (Steps + Screenshots)
```

---

## 🖥 Frontend Architecture

- **Framework:** React
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **API Communication:** Axios

**Frontend Responsibilities**
- Authentication (Login / Signup)
- Video upload UI
- Editor & structured documentation view
- Screenshot rendering
- Transcript display

---

## ⚙️ Backend Architecture

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Media Processing:** FFmpeg
- **Speech-to-Text:** Whisper (local)
- **Authentication:** JWT

**Backend Responsibilities**
- User authentication & authorization
- Video upload handling
- Background screenshot extraction
- Transcript generation
- Structured content generation
- Static screenshot serving

---

## 🔧 Setup & Installation Instructions

### Prerequisites

Ensure the following are installed:

- Node.js (v18+ recommended)
- MongoDB (local or cloud)
- FFmpeg (added to system PATH)
- Python 3.9+
- pip

### ▶️ How to Run the Project

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/clueso-clone.git
cd clueso-clone
```

### Environment Variables (backend/.env)

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 🔙 Backend Setup

```bash
cd backend
npm install
```

### Run Backend Server

```bash
npm run dev
```

### Backend runs at:
http://localhost:5000

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
### Frontend runs at:
http://localhost:5173

---

## Example Use Case

1. Start MongoDB
2. Start backend server
3. Start frontend server
4. Open browser → http://localhost:5173
5. Sign up or log in
6. Upload a video
7. Editor page loads automatically
8. Transcript, steps, and screenshots are generated

---

## Static File Handling

Screenshots are stored at:
```bash
backend/uploads/screenshots/<projectId>/
```

Express serves them using:
```bash
app.use("/uploads", express.static("uploads"));
```

Frontend accesses screenshots directly:
```bash
http://localhost:5000/uploads/screenshots/<projectId>/step_01.png
```

---

## Key Design Decisions & Assumptions

### 1️⃣ Local Whisper Instead of Cloud APIs

* No paid API dependency
* Works offline
* Better privacy
* More control over transcription pipeline

### 2️⃣ Non-Blocking Upload Flow

*Project is created instantly
*Heavy processing runs in background
*Better user experience

### 3️⃣ Step Generation Strategy

*Transcript divided into logical chunks
*Steps generated from transcript windows
*Screenshots grouped per step instead of exact timestamps
*Chosen for reliability and simplicity

### 4️⃣ Monorepo Architecture

*Faster setup
*Easier evaluation
*Cleaner development workflow

---

## 🔒 Security Considerations

*JWT-based authentication
*User-specific project access
*Projects are isolated per user
* .env files excluded from version control

 ---
 
## 📈 Future Improvements

* Export documentation as Markdown / PDF
* Timeline-accurate screenshot mapping
* Cloud deployment (Docker)
* Team collaboration features

  ---

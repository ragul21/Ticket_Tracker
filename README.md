# Ticket Tracker – Full Stack Application

A simple full-stack Ticket Management system built using:

- **Frontend:** Next.js + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Deployment:** Vercel (Frontend) + Render (Backend)


## Live Demo

- **Frontend:**  
  https://ticket-tracker-tawny.vercel.app  

- **Backend API:**  
  https://ticket-tracker-jw88.onrender.com  



## Features

### Backend (REST API)
- Create a ticket
- Get all tickets
- Filter tickets by priority and status
- Update ticket status
- Delete a ticket

### Frontend (Dashboard)
- Display all tickets
- Filter by priority and status
- Inline status update (dropdown)
- Create ticket using modal form
- Delete ticket



## Local Setup Instructions

### Clone the repository

```bash
git clone https://github.com/ragul21/Ticket_Tracker.git
cd Ticket_Tracker
```

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URL=your_connection_string
PORT=5000
```

Start the server:

```bash
node server.js
```
## 🔹 Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend/frontend
npm install
```

Create a `.env.local` file inside the `frontend/frontend` folder:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

## Design Decisions

-Used MongoDB Atlas for cloud-hosted database

-Used environment variables to avoid hardcoded URLs

-Followed RESTful API structure

-Kept UI simple and functional

-Implemented inline status updates for better UX

## Screenshots of Application

<img width="1918" height="1044" alt="image" src="https://github.com/user-attachments/assets/55690121-52e7-4caa-8455-466560ebd9a3" />

### Inline status update 

<img width="322" height="289" alt="image" src="https://github.com/user-attachments/assets/e5464cce-cf92-45fb-b8ed-c00b7825c6b5" />

### Filters 

<img width="620" height="356" alt="image" src="https://github.com/user-attachments/assets/bb4415e8-ca7c-4ccd-adb7-dddc846704ec" />

<img width="542" height="330" alt="image" src="https://github.com/user-attachments/assets/d3265ce5-7f26-49c4-9fd3-3645daaa54d0" />


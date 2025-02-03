# Notes App - MERN Stack Application

A full-stack notes management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication and real-time note management.

## Features

- 🔐 User authentication (register/login)
- 📝 Create, read, update, and delete notes
- 🏷️ Tag system for note organization
- 🎨 Color-coding for visual organization
- 🔍 Search and filter notes
- 📱 Responsive design
- 🔄 Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd notes-app
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Create .env file in the root directory (if needed)
# Start the development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file in the backend directory with the following:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Start the server
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Security Note
This is a demonstration project for interview purposes. In a production environment:
- JWT_SECRET should be a strong, randomly generated string
- Environment variables should never be committed to version control
- Database credentials should be properly secured
- CORS settings should be properly configured
- Rate limiting should be implemented
- Input validation should be more strict

## Project Structure

```
notes-app/
├── src/                  # Frontend source files
│   ├── components/      # React components
│   ├── context/        # Context providers
│   ├── pages/          # Page components
│   └── App.jsx         # Main App component
├── backend/             # Backend source files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   └── server.js      # Express server setup
└── README.md
```

## API Endpoints

### Auth Routes
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/change-password` - Change password (protected)

### Notes Routes (Protected)
- GET `/api/notes` - Get all notes
- POST `/api/notes` - Create new note
- PUT `/api/notes/:id` - Update note
- DELETE `/api/notes/:id` - Delete note

## Technologies Used

### Frontend
- React
- React Router DOM
- TailwindCSS
- JWT Decode
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt

## Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

3. Visit `http://localhost:5173` in your browser

## Production

To build for production:

```bash
# Build frontend
npm run build

# The build files will be in the dist/ directory
```



# 🏏 Cricket Info Website

A full-stack web application for managing and viewing cricket information including live matches, team rankings, player statistics, and comprehensive admin management system.

c:\Users\mahek\OneDrive\Pictures\Screenshots\Screenshot 2025-10-11 143905.png

## 🎯 Overview

Cricket Info Website is a modern, responsive web application built as part of an internship project. It provides cricket enthusiasts with real-time match updates, team rankings, and detailed player statistics. The platform includes a powerful admin panel for content management with full CRUD (Create, Read, Update, Delete) operations.

**Live Demo:** [Your Deployed URL Here]

## ✨ Features

### For Users
- 🏠 **Home Page**
  - View live cricket matches with real-time updates
  - Browse upcoming match schedules
  - See completed match results
  
- 📊 **Team Rankings**
  - ICC team rankings with points

- 👥 **Players Database**
  - Comprehensive player profiles
  - Player statistics (runs, wickets, matches)
  - Search functionality
  - Batting and bowling style information

- 🔐 **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Password encryption with bcrypt

### For Administrators
- 🎛️ **Admin Panel Dashboard**
  - Manage players (Add, Edit, Delete)
  - Manage teams (Add, Edit, Delete)
  - Manage matches (Add, Edit, Delete)
  - Real-time data synchronization
  - User-friendly interface with modal forms

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Custom CSS** - Additional styling
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/cricket-info-website.git
cd cricket-info-website
```

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add environment variables (see below)

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend folder (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env

# Add environment variables (see below)

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🔐 Environment Variables

### Backend `.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017/db_name
# For production use MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/db_name

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Optional: For deployment
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`

```env
# API URL
VITE_API_URL=http://localhost:5000

# For production:
# VITE_API_URL=https://your-backend-url.com
```

## 💻 Usage

### Starting the Application

1. **Start MongoDB** (if using local):
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

2. **Start Backend**:
```bash
cd backend
npm run dev
```

3. **Start Frontend**:
```bash
cd frontend
npm run dev
```

4. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Creating an Admin User

1. Register a new user through the website
2. Access MongoDB:
```bash
mongosh
use cricketdb
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```
3. Logout and login again
4. Access Admin Panel from navigation

### Adding Sample Data

Use the sample data provided in `SAMPLE_DATA.md` or add through Admin Panel:

```bash
mongosh
use cricketdb

# Insert teams
db.teams.insertMany([...])

# Insert players
db.players.insertMany([...])

# Insert matches
db.matches.insertMany([...])
```

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    Register new user
POST   /api/auth/login       Login user
```

### Players
```
GET    /api/players          Get all players
POST   /api/players          Add new player (Admin)
PUT    /api/players/:id      Update player (Admin)
DELETE /api/players/:id      Delete player (Admin)
```

### Teams
```
GET    /api/teams            Get all teams
POST   /api/teams            Add new team (Admin)
PUT    /api/teams/:id        Update team (Admin)
DELETE /api/teams/:id        Delete team (Admin)
```

### Matches
```
GET    /api/matches          Get all matches
POST   /api/matches          Add new match (Admin)
PUT    /api/matches/:id      Update match (Admin)
DELETE /api/matches/:id      Delete match (Admin)
```

## 🌐 Deployment

### Deploy on Railway (Recommended)

1. Push code to GitHub
2. Sign up on [Railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Railway auto-detects both services
5. Add environment variables
6. Deploy! 🚀

Detailed deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)

### Deploy on Render

**Backend:**
- Create Web Service
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

**Frontend:**
- Create Static Site
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### MongoDB Atlas Setup

1. Create free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP (0.0.0.0/0 for development)
4. Get connection string
5. Add to environment variables

## 📁 Project Structure

```
cricket-info-website/
├── backend/
│   ├── server.js           # Express server and routes
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── _redirects     # Netlify redirects
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Teams.jsx
│   │   │   ├── Players.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── config.js      # API configuration
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
├── screenshots/           # Application screenshots
├── README.md             # This file
├── DEPLOYMENT.md         # Deployment guide
└── .gitignore           # Git ignore file
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Home page displays matches
- [ ] Rankings page shows teams
- [ ] Players page shows players
- [ ] Search functionality works
- [ ] Admin can access admin panel
- [ ] Admin can add data
- [ ] Admin can edit data
- [ ] Admin can delete data
- [ ] Logout works
- [ ] Protected routes work
- [ ] Responsive design works

## 👨‍💻 Author

- GitHub: [My github](https://github.com/Mahek-Dudhat)
- LinkedIn: [My LinkedIn](https://www.linkedin.com/in/mahek-dudhat-712b3431a/)

⭐ **Star this repository if you found it helpful!**

**Made with ❤️ for cricket enthusiasts**

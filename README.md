# Intern Dashboard Full Stack Application

A full-stack dashboard application for interns to track their progress and compete on a leaderboard.

## Project Overview

This project consists of two main parts:
1. A React TypeScript frontend with Tailwind CSS
2. A Node.js/Express.js backend with MongoDB support

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git

### Starting the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The backend will start on http://localhost:3001

### Starting the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on http://localhost:5173

## Project Structure

```
/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/      # API services
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── backend/                # Node.js/Express.js backend
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── controllers/  # Route controllers
│   │   └── routes/      # API routes
│   ├── package.json
│   └── README.md
│
└── README.md              # This file
```

## Features

- 👩‍💻 Intern dashboard with personal stats
- 📊 Real-time leaderboard
- 🎯 Progress tracking
- 🌐 RESTful API
- 📱 Responsive design

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (prepared)
- CORS middleware

## API Endpoints

- `GET /api/intern` - Get intern details
- `GET /api/leaderboard` - Get leaderboard data

## Development

### Frontend Development

The frontend uses Vite for fast development and hot module replacement. Run `npm run dev` in the frontend directory for development.

### Backend Development

The backend uses nodemon for automatic server restarting during development. Run `npm run dev` in the backend directory.

## Deployment

### Frontend
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` directory to your hosting service

### Backend
1. Set environment variables for production
2. Deploy to your hosting service
3. Update the frontend's API base URL

## Future Improvements

1. Add authentication and authorization
2. Implement MongoDB integration
3. Add real-time updates using WebSocket
4. Add more dashboard features
5. Implement caching strategies
6. Add testing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

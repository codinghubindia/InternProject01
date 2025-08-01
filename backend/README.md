# Intern Dashboard Backend

This is the serverless backend for the Intern Dashboard application, designed to be deployed on Netlify. It provides API endpoints for intern details and leaderboard data.

## Features

- Serverless API endpoints using Netlify Functions
- CORS enabled for frontend access
- Mock data implementation (ready for MongoDB integration)
- Basic MVC pattern structure
- Easy deployment to Netlify

## API Endpoints

- `GET /api/intern` - Get intern details
- `GET /api/leaderboard` - Get leaderboard data

## Tech Stack

- Node.js
- Express.js
- MongoDB (prepared for future integration)
- CORS middleware

## Getting Started

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on port 3001 by default.

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Main application entry
│   ├── models/           # Database models
│   │   └── intern.model.js
│   ├── controllers/      # Route controllers (to be implemented)
│   └── routes/          # Route definitions (to be implemented)
├── package.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
MONGODB_URI=your_mongodb_uri (for future use)
```

## API Response Examples

### GET /api/intern
```json
{
  "name": "Manjunatha N",
  "referralCode": "manjunatha2025",
  "donationsRaised": 12000
}
```

### GET /api/leaderboard
```json
[
  { "name": "Alice", "donations": 15000 },
  { "name": "Bob", "donations": 13000 },
  { "name": "Kumari", "donations": 12000 },
  { "name": "Divya", "donations": 10000 },
  { "name": "Raj", "donations": 8000 }
]
```

## Future Improvements

1. Implement MongoDB connection
2. Add authentication middleware
3. Add more API endpoints for full CRUD operations
4. Implement proper error handling and validation
5. Add API documentation using Swagger/OpenAPI

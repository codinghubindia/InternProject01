# Intern Dashboard Frontend

A React TypeScript application for the Intern Dashboard with a modern UI using Tailwind CSS.

## Features

- Modern React with TypeScript
- Real-time dashboard updates
- Leaderboard visualization
- Responsive design with Tailwind CSS
- Environment-based configuration

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React (icons)

## Getting Started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the frontend directory:
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The app will start on http://localhost:5173

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── Dashboard.tsx
│   │   ├── Leaderboard.tsx
│   │   └── LoginPage.tsx
│   ├── services/      # API and other services
│   │   └── api.ts
│   ├── App.tsx        # Main app component
│   └── main.tsx       # Entry point
├── public/            # Static assets
├── package.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

The following environment variables can be configured:

- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3001/api)

## API Integration

The frontend communicates with the backend through the following endpoints:

- `GET /api/intern` - Fetch intern details
- `GET /api/leaderboard` - Fetch leaderboard data

## Future Improvements

1. Add authentication flow
2. Implement real-time updates using WebSocket
3. Add more interactive visualizations
4. Implement caching strategies
5. Add offline support
6. Implement proper error boundaries

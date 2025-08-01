const express = require('express');
const cors = require('cors');
const { mockIntern, mockLeaderboard } = require('./models/intern.model');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/intern', (req, res) => {
  res.json(mockIntern);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(mockLeaderboard);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

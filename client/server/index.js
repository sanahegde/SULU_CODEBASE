const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON requests

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// API route to provide adventure data based on mood
app.get('/api/adventure/:mood', (req, res) => {
  const mood = req.params.mood;
  res.json({ message: `Adventure data for mood: ${mood}` });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

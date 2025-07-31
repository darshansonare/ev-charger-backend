require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  'http://localhost:5173',
  'https://mapcharge.netlify.app'
  
];

app.use(cors({
  origin: (origin, callback) => {
    console.log(`CORS request from origin: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      
      callback(null, true);
    } else {
      console.log(`CORS error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/chargers', chargerRoutes);

// Test route
app.get('/', (req, res) => {
  res.send({ activeStatus: true, message: 'Local server running' });
});

// ✅ Local server start
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});

// server.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://mapcharge.netlify.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/chargers', chargerRoutes);

app.get('/', (req, res) => {
  res.send({ activeStatus: true });
});

// ✅ Vercel expects this
module.exports = app;



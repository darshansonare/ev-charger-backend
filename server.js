require('dotenv').config();
const express = require('express');
const cors = require('cors');

const PORT = process.env.DB_PORT || 3000;
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

const app = express();

// ✅ Allow both Netlify and localhost in CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://mapcharge.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// ✅ Auth routes
app.use('/api', authRoutes);

// ✅ Charger routes
app.use('/api/chargers', chargerRoutes);

// ✅ Root route: helpful info
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
    frontend: [
      'http://localhost:3000',
      'https://mapcharge.netlify.app/login'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth routes (login, register)
app.use('/api', authRoutes);

// ✅ Charger routes
app.use('/api/chargers', chargerRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

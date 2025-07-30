require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Auth routes (login, register)
app.use('/api', authRoutes);

// ✅ Charger routes
app.use('/api/chargers', chargerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

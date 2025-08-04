/// load .env file
require('dotenv').config(); 
// import express and cors 
// cors we use to communicate with the frontend 
const express = require('express');
const cors = require('cors');

// import routes auth and chargers
const authRoutes = require('./routes/auth');
const chargerRoutes = require('./routes/chargers');
//create express app
const app = express();
// get port no from env
const PORT = process.env.PORT;


// this allowed origin means in this url project will run
const allowedOrigins = [
  'http://localhost:5173',
  'https://mapcharge.netlify.app'
  
];

// cors configuration
app.use(cors({
  origin: '*',  // Allow all origins for assignment verification
}));

// when we send data in json format
// then parse it and make it available in req.body
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/chargers', chargerRoutes);


app.get('/', (req, res) => {
  res.send({ activeStatus: true, message: 'Local server running' });
});

//local server port run on 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});

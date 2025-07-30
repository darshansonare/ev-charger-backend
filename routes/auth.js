const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../config/db');
const User = require('../models/User'); // model for MySQL query

const secret = process.env.JWT_SECRET;

// ✅ LOGIN API
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(401).json({ message: 'Invalid user' });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing passwords' });
      if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

      const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, role: user.role  }
      });
    });
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const role = 'user'; // default role

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  User.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });

    if (results.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, hashedPassword, role], (err) => {
      if (err) return res.status(500).json({ message: 'Error creating user' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

module.exports = router;

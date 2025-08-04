const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// show all chargers to all logged-in users
router.get('/', auth, (req, res) => {
  db.query('SELECT * FROM chargers', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching chargers' });
    res.json(results);
  });
});


// Add a charger
router.post('/', auth, (req, res) => {
  const { name, status, location, latitude, longitude } = req.body;
  const userId = req.user.id;

  const insertQuery = 'INSERT INTO chargers (name, status, location, latitude, longitude, user_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [name, status, location, latitude, longitude, userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding charger' });
    res.status(201).json({ message: 'Charger added' });
  });
});

// Update charger
router.put('/:id', auth, (req, res) => {
  db.query('UPDATE chargers SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Charger updated' });
  });
});

// Delete charger
router.delete('/:id', auth, (req, res) => {
  db.query('DELETE FROM chargers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Charger deleted' });
  });
});
// we use this for export in another file
module.exports = router;

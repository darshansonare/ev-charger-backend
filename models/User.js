// import db connection
const db = require('../config/db');

// for finding user
exports.findByUsername = (username, callback) => {
  db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

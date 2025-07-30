const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token missing or malformed' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Get token after "Bearer"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // or 'your_jwt_secret'
    req.user = decoded; // ✅ Make user data available in routes
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

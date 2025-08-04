//import jsonwebtoken for verify token
const jwt = require('jsonwebtoken');

// this function acc before protected routes
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Token missing or malformed' });
  }

  //extract token from header
  // we assume the token is in the format "Bearer <token>"
  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    //here we save decoded token to req.user so that we can access user info
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

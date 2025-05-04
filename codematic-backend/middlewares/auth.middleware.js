const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized, no token provided' });
  }

  // Extract the token from the Authorization header (Bearer token)
  const token = authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, invalid token format' });
  }

  try {
    // Verify the token using your JWT secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    next(); // Continue to the next middleware/route handler
  } catch (error) {
    // If the token is invalid or expired
    return res.status(401).json({ error: 'Unauthorized, invalid or expired token' });
  }
};

module.exports = {
  authenticate
};

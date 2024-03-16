// authMiddleware.js

const authorizeUserRole = (role) => {
    return (req, res, next) => {
      if (req.user && req.user.role === role) {
        next();
      } else {
        return res.status(403).json({ message: 'Authorization failed: Insufficient permissions' });
      }
    };
  };
  
  module.exports = { authorizeUserRole };
  
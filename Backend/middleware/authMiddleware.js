const jwt = require("jsonwebtoken");

const authMiddleware = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Check if the token is in the format 'Bearer <token>'
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      // Role-based access control
      if (role && decoded.role !== role) {
        return res.status(403).json({
          message: "Forbidden: You don't have the required permissions",
        });
      }

      req.user = decoded; // Store decoded user info (like userId and role) in the request object
      next();
    });
  };
};

module.exports = authMiddleware;

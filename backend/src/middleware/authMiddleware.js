import User from "../models/User.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, config.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "❌ User not found" });
      }
      next();
    } else {
      return res.status(401).json({ message: "❌ Not authorized, no token" });
    }
  } catch (error) {
    next(error);
  }
};

export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed to access this resource`,
      });
    }
    next();
  };
};

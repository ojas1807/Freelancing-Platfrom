import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Import your User model

export const protect = async (req, res, next) => {
  // 1. Get token from header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Verify token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route"
    });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "The user belonging to this token no longer exists"
      });
    }

    // 5. Attach user to request
    req.user = {
      _id: currentUser._id,
      email: currentUser.email,
      role: currentUser.role
      // Add other needed user fields
    };
    
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route"
    });
  }
};
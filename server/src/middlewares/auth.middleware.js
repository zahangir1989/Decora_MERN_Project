import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import User from "../models/User.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(new ApiError("Not authenticated", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ApiError("User not found", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError("Authentication failed", 401));
  }
};

export default authMiddleware;

import ApiError from "../utils/apiError.js";
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("Access denied: insufficient permissions", 403));
    }
    next();
  };
};

export default authorize;

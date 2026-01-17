import ApiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Default values
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  /* ======================
     MONGOOSE ERRORS
  ====================== */

  // Invalid MongoDB ObjectId
  if (error.name === "CastError") {
    error = new ApiError("Resource not found", 404);
  }

  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    error = new ApiError(`${field} already exists`, 409);
  }

  // Validation error
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map(
      (val) => val.message
    );
    error = new ApiError(messages.join(", "), 400);
  }

  /* ======================
     JWT ERRORS
  ====================== */
  if (error.name === "JsonWebTokenError") {
    error = new ApiError("Invalid token", 401);
  }

  if (error.name === "TokenExpiredError") {
    error = new ApiError("Token expired, please login again", 401);
  }

  /* ======================
     RESPONSE
  ====================== */
  res.status(error.statusCode).json({
    success: false,
    status: error.status || "error",
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};

export default errorHandler;

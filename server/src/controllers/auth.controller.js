import User from "../models/User.model.js";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return next(new ApiError("All fields are required", 400));
    }

    // 2️⃣ Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError("User already exists with this email", 409));
    }

    // 3️⃣ Create user (password hashed in model)
    const user = await User.create({
      name,
      email,
      password,
    });

    // 4️⃣ Send response (password auto removed via toJSON)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
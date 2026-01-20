import User from "../models/User.model.js";
import ApiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

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
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Save with cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Save token in cookie
    res.cookie("token", token, cookieOptions);

    // 4️⃣ Send response (password auto removed via toJSON)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      token,
    });

    // crete jwt token
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// register
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check fields
    if (!email || !password) {
      return next(new ApiError("Email and password are required", 400));
    }

    // 2️⃣ Find user + password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ApiError("Invalid email or password", 401));
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ApiError("Invalid email or password", 401));
    }

    // 4️⃣ Generate JWT
    const token = generateToken(user._id);

    // 5️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 6️⃣ Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// logout

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // ⏰ expire immediately
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// get me
export const getMe = async (req, res, next) => {
  try {
    const user = req.user; // set by auth middleware
    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};


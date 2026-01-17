import express from "express";
import {
//   registerUser,
//   loginUser,
//   getMe,
registerUser
} from "../controllers/auth.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user
 * @access  Public
 */
// router.post("/login", loginUser);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get logged-in user profile
 * @access  Private
 */
// router.get("/me", authMiddleware, getMe);

export default router;

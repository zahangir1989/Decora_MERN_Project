import express from "express";
import {
  addToCart,
  clearCart,
  getMyCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/my-cart", authMiddleware, getMyCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.delete("/clear", authMiddleware, clearCart);

export default router;

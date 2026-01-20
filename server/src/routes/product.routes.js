import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import authorize from "../middlewares/role.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

// Public
router.get("/all", getProducts);
router.get("/single/:id", getProductById);

// Admin only
router.post("/add", authMiddleware, authorize("admin"), createProduct);
router.put("/edit/:id", authMiddleware, authorize("admin"), updateProduct);
router.delete(
  "/deleted/:id",
  authMiddleware,
  authorize("admin"),
  deleteProduct,
);

export default router;

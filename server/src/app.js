import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import ApiError from "./utils/apiError.js";
import errorHandler from "./middlewares/error.middleware.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

/* ======================
   GLOBAL MIDDLEWARES
====================== */
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

/* ======================
   ROUTES
====================== */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

/* ======================
   404 HANDLER
====================== */
// app.all("/*", (req, res, next) => {
//   next(new ApiError(`Can't find ${req.originalUrl}`, 404));
// });

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(`Cannot find ${req.originalUrl} on this server`, 404));
});

/* ======================
   ERROR HANDLER
====================== */
app.use(errorHandler);

export default app;

import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config();

/* ======================
   HANDLE UNCAUGHT ERRORS
====================== */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1);
});

/* ======================
   DB CONNECTION
====================== */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};

connectDB();

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});

/* ======================
   HANDLE PROMISE ERRORS
====================== */
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
  server.close(() => process.exit(1));
});

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message} ❌`);
    process.exit(1); // Exit process with failure
  }
};

// Handle initial connection errors
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Optional: log successful connection
mongoose.connection.once("open", () => {
  console.log("MongoDB connection open and ready 🔗");
});

export default connectDB;

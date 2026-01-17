import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// For ES Modules: get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Optional: validate required environment variables
const requiredEnvs = ["PORT", "MONGO_URI", "JWT_SECRET", "JWT_EXPIRES_IN"];

requiredEnvs.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ ERROR: Missing required env variable ${key}`);
    process.exit(1);
  }
});

// Export env variables
export const env = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  nodeEnv: process.env.NODE_ENV || "development",
};

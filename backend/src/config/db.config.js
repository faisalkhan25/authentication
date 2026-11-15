import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(envConfig.MONGO_URI);
    console.log(
      `[Database]: MongoDB connected successfully (Host: ${connectionInstance.connection.host})`
    );
  } catch (error) {
    console.error(`[Database Error]: MongoDB connection failed - ${error.message}`);
    process.exit(1);
  }
};


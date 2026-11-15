import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`[Config Error]: Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

export const envConfig = Object.freeze({
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
});


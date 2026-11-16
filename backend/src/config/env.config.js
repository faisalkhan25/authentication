import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["MONGO_URI", "PORT", "REDIS_URL"];

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
  REDIS_URL: process.env.REDIS_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
});


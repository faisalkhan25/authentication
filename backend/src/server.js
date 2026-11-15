import app from "./app.js";
import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import { connectRedis } from "./config/redis.config.js";

const startServer = async () => {
  await connectDB();

  await connectRedis();

  app.listen(envConfig.PORT, () => {
    console.log(
      `[Server]: Running in ${envConfig.NODE_ENV} mode on port ${envConfig.PORT}`
    );
  });
};

startServer();


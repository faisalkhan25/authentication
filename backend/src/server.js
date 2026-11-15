import app from "./app.js";
import { envConfig } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";

const startServer = async () => {
  await connectDB();

  app.listen(envConfig.PORT, () => {
    console.log(
      `[Server]: Running in ${envConfig.NODE_ENV} mode on port ${envConfig.PORT}`
    );
  });
};

startServer();


import Redis from 'ioredis'
import { envConfig } from './env.config.js';


export const redisClient = new Redis(envConfig.REDIS_URL, {
    lazyConnect: true,
});

redisClient.on("error", (err) => {
    console.error(`[Redis Error]: ${err.message}`);
});

export const connectRedis = async () => {
    try{
        await redisClient.connect();
        console.log("[Redis]: Connected successfully");
    } catch (error) {
        console.error(`[Redis Error]: connection failed - ${error.message}`);
        process.exit(1);
    }
}
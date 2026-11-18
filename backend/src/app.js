import express from "express";
import userRouter from "./routes/user.routes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { envConfig } from "./config/env.config.js";


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: envConfig.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))



app.use('/api/v1', userRouter)

export default app;


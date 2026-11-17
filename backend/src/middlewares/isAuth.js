import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env.config.js';
import { redisClient } from '../config/redis.config.js';
import { User } from '../schema/user.schema.js';



export const isAuth = async(req, res, next) => {
    
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken) {
            return res.status(403).json({
                message: "Please Login - No Token Provided"
            });
        }

        let decodedData;
        try{
            decodedData = jwt.verify(accessToken, envConfig.ACCESS_TOKEN_SECRET);
        }catch {   
            return res.status(400).json({
                message: "Token is Expired"
            })
        }

        const cachedUser = await redisClient.get(`user:${decodedData.id}`);


        if(cachedUser) {
            req.user = JSON.parse(cachedUser);
            return next();
        }


        const user = await User.findById(decodedData.id).select('-password');

        if(!user) {
            return res.status(400).json({
                message: "This user does not exist"
            });
        }

        req.user = user;
        redisClient.set(`user:${decodedData.id}`, JSON.stringify(user), "EX", 900);
        
        next();

        
    }catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}
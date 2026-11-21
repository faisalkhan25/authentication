import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env.config.js'
import { redisClient } from '../config/redis.config.js';
import crypto from 'node:crypto'



export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({id}, envConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });
    const refreshToken = jwt.sign({id}, envConfig.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });


    const refreshTokenKey = `refresh-token-key:${id}`;
    await redisClient.set(refreshTokenKey, refreshToken, "EX", 7 * 24 * 60 * 60)

    const csrfToken = generateCsrfToken(res);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return {csrfToken, accessToken, refreshToken};
}

export const verifyRefreshToken = async(refreshToken) => {
    try {

        let decodedData;
        try{
            decodedData = jwt.verify(refreshToken, envConfig.REFRESH_TOKEN_SECRET);
        }catch {
            throw new Error("Refresh Token not valid");
        }


        const storedRefreshToken = await redisClient.get(`refresh-token-key:${decodedData.id}`);

        if(!storedRefreshToken || (String(refreshToken) !== String(storedRefreshToken)) ) {
            return null;
        }

        return decodedData;


    } catch (error) {
        console.log("error is: " + error.message);
        throw new Error("Something went wrong in verifying refresh token");
    }
}


export const generateAccessToken = async (id, res) => {

    const accessToken = jwt.sign({id}, envConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    });
}


export const revokeRefreshToken = async (userId) => {
    await redisClient.del(`refresh-token-key:${userId}`);
}

export const generateCsrfToken = ( res) => {
    
    const csrfToken = crypto.randomBytes(16).toString("hex");
    const hashedCsrfToken = crypto
        .createHash("sha256")
        .update(csrfToken)
        .digest("hex");

    
    res.cookie("csrfToken", hashedCsrfToken, {
        httpOnly: false,
        secure: envConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    })
    return hashedCsrfToken;
}
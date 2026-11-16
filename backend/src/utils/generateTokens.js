import jwt from 'jsonwebtoken'
import { envConfig } from '../config/env.config.js'


export const generateToken = async (id, res) => {
    const accessToken = jwt.sign({id}, envConfig.ACCESS_TOKEN_SECRET, {
        expiresIn: "2m"
    });
    const refreshToken = jwt.sign({id}, envConfig.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    });


    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 2 * 60 * 1000
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}
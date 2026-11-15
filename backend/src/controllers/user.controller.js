import tryCatch from "../middlewares/tryCatch.js";
import sanitize from 'mongo-sanitize'
import { registerUserValidation } from "../validations/user.validation.js";
import { redisClient } from "../config/redis.config.js";
import { User } from "../schema/user.schema.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import sendMail from "../config/sendMail.config.js";
import { getVerifyEmailHtml } from "../config/html.js";

export const registerUser = tryCatch(
    async (req, res, next) => {

        const sanitizedBody = sanitize(req.body);
        const validation = registerUserValidation.safeParse(sanitizedBody);

        if(!validation.success) {
            const flattened = validation.error.flatten();
            return res.status(400).json({
                message: flattened.fieldErrors,
                formErrors: flattened.formErrors
            })
        }

        const {name, email, password} = validation.data;


        const rateLimitKey = `register-rate-limit:${req.ip}:${email}`;

        if(await redisClient.get(rateLimitKey)){
            return res.status(429).json({
                message: "Too many requests, try again later"
            })
        }

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists!"
            })
        }


        const hashPassword = await bcrypt.hash(password, 10);

        const verifyToken = crypto.randomBytes(32).toString("hex");

        const verifyKey = `verify:${verifyToken}`;

        const dataToStore = JSON.stringify({
            name,
            email,
            password: hashPassword
        });

        
        const subject = "Verify Email";
        const html = getVerifyEmailHtml({ email, token: verifyToken });
        
        await redisClient.set(verifyKey, dataToStore, "EX", 300);

        await sendMail({email, subject, html});
        

        await redisClient.set(rateLimitKey, "true", "EX", 60);

        return res.status(201).json({
            message: "If your email is valid, a verification link has been sent.It will expire in 5 mins"
        })

    }
);

export const verifyUser = tryCatch(async (req, res) => {
    
    const { token } = req.params;

    if(!token) {
        return res.status(400).json({
            message: "Verification token is required"
        });
    }

    const verifyKey = `verify:${token}`;

    const userDataJSON = await redisClient.get(verifyKey);

    if(!userDataJSON) {
        return res.status(400).json({
            message: "Verification link is expired"
        })
    }

    await redisClient.del(verifyKey);

    const userData = JSON.parse(userDataJSON);

    const existingUser = await User.findOne({email: userData.email});
    if(existingUser) {
        return res.status(400).json({
            message: "user already exists"
        })
    }

    const newUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    res.status(201).json({
        message: "email verified successfully! your account has been created",
        user: { _id: newUser._id, name: newUser.name, email: newUser.email }
    })
});
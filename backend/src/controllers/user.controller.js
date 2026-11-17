import tryCatch from "../middlewares/tryCatch.js";
import sanitize from 'mongo-sanitize'
import { loginSchemaValidation, registerUserValidation } from "../validations/user.validation.js";
import { redisClient } from "../config/redis.config.js";
import { User } from "../schema/user.schema.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import sendMail from "../config/sendMail.config.js";
import { getOtpHtml, getVerifyEmailHtml } from "../config/html.js";
import { generateAccessToken, generateToken, revokeRefreshToken, verifyRefreshToken } from "../utils/generateTokens.js";

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
                message: `Too many requests, try again after ${await redisClient.ttl(rateLimitKey)} seconds`
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

export const loginUser = tryCatch(async(req, res) => {
    

    const sanitizedBody = sanitize(req.body);
    const validation = loginSchemaValidation.safeParse(sanitizedBody);

    if(!validation.success) {

        const errors = validation.error.flatten();

        return res.status(400).json({
            message: errors.fieldErrors,
            formErrors: errors.formErrors
        });
    }


    const {email, password} = validation.data;
 
    const rateLimitKey = `login-rate-limit:${req.ip}:${email}`;

    if(await redisClient.get(rateLimitKey)) {
        const time = await redisClient.ttl(rateLimitKey);
        return res.status(429).json({
            message: `Too many requests, try again later after ${time} seconds`
        })
    }

    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }
    
    
    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpKey = `otp:${email}`;

    await redisClient.set(otpKey, JSON.stringify(otp), "EX", 500);


    const subject = "OTP for verification";
    const html = getOtpHtml({email, otp});


    await sendMail({email, subject, html});

    await redisClient.set(rateLimitKey, "true", "EX", 60);

    return res.status(200).json({
        message: "OTP has been sent to your registered email and is valid for 5 minutes"
    })
})

export const verifyOtp = tryCatch(async (req, res) => {

    const {email, otp} = req.body;

    if(!email || !otp) {
        return res.status(400).json({
            message: "Details not found"
        });
    }

    const otpKey = `otp:${email}`

    const storedOtpString = await redisClient.get(otpKey);

    if(!storedOtpString) {
        return res.status(400).json({
            message: "Otp is expired"
        });
    }
    const storedOtp = JSON.parse(storedOtpString);

    if(String(otp) !== String(storedOtp)) {
        return res.status(400).json({
            message: "Invalid Otp"
        })
    }


    await redisClient.del(otpKey);

    let user = await User.findOne({email});

    const tokenData = await generateToken(user._id, res);

    res.status(200).json({
        message: `Welcome ${user.name}`,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

})

export const myProfile = tryCatch(async (req, res) => {
    const user = req.user;

    res.status(200).json({
        user,
    })
})


export const getAccessTokenUsingRefreshToken = tryCatch(async (req, res) => {

    const refreshToken = req.cookies?.refreshToken;

    console.log(refreshToken);

    if(!refreshToken) {
        return res.status(401).json({
            message: "Login Again"
        })
    }

    
    const decodedData = await verifyRefreshToken(refreshToken);
    if(!decodedData) {
        res.clearCookie("refreshToken");

        return res.status(401).json({
            message: "Refresh Token not valid"
        })
    }

    generateAccessToken(decodedData.id, res);

    res.status(200).json({
        message: "token refreshed"
    });

})


export const logout = tryCatch(async (req, res) => {

    const userId = req.user._id;

    await revokeRefreshToken(userId);
    await redisClient.del(`user:${userId}`);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.status(200).json({
        message: "Logout Successfull"
    })
})
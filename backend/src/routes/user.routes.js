import express from 'express'
import { getAccessTokenUsingRefreshToken, loginUser, myProfile, registerUser, verifyOtp, verifyUser } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';


const router = express.Router();

router.post("/register", registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.post('/verifyotp', verifyOtp);
router.get('/me', isAuth, myProfile);
router.get('/refresh', getAccessTokenUsingRefreshToken);

export default router;
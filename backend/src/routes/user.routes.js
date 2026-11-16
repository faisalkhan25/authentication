import express from 'express'
import { loginUser, registerUser, verifyOtp, verifyUser } from '../controllers/user.controller.js';


const router = express.Router();

router.post("/register", registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.post('/verifyotp', verifyOtp)

export default router;
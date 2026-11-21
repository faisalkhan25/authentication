import express from 'express'
import { getAccessTokenUsingRefreshToken, getAdmin, loginUser, logout, myProfile, refreshCsrfToken, registerUser, verifyOtp, verifyUser } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
import { csrfTokenVerify } from '../middlewares/csrfMiddleware.js';
import { adminCheck } from '../middlewares/adminCheckMiddleware.js';


const router = express.Router();

router.post("/register", registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.post('/verifyotp', verifyOtp);
router.get('/me', isAuth, myProfile);
router.get('/refresh', getAccessTokenUsingRefreshToken);
router.post('/logout', isAuth, csrfTokenVerify , logout);
router.get('/csrf-token', isAuth, refreshCsrfToken);
router.post('/admin', isAuth, adminCheck, getAdmin);

export default router;
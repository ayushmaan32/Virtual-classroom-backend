import express from "express";
import controller from "../controller/userAuthController";
import { otpLimiter } from "../utils/RateLimiter/otpLimiter";
import { passwordResetLimiter } from "../utils/RateLimiter/passwordResetLimiter";

const router = express.Router();

// Register a new admin or instructor
router.post("/register", controller.registerUser);

// User login
router.get("/login", controller.loginUser);

// Endpoint to generate and send OTP to email
router.post("/generate-otp", otpLimiter, controller.generateOTP);

//reset password after verying otp
router.post("/reset-password", passwordResetLimiter, controller.resetPassword);

export default router;

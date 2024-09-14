import express from "express";
import controller from "../controller/userAuthController";

const router = express.Router();

// Register a new admin or instructor
router.post("/register", controller.registerUser);

// User login
router.get("/login", controller.loginUser);

export default router;

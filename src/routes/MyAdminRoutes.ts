import express from "express";
import controller from "../controller/myadminController";
import { adminOnly, protect } from "../middleware/authmiddleware";

const router = express.Router();

// routes to change role of user by admin
router.post("/role-update", protect, adminOnly, controller.updateUserRole);

export default router;

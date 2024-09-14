import express from "express";
import controller from "../controller/classController";
import { adminOrInstructor, protect } from "../middleware/authmiddleware";

const router = express.Router();

// create class
router.post("/", protect, adminOrInstructor, controller.createClass);

// update class
router.put("/:id", protect, adminOrInstructor, controller.updateClass);

// delete class
router.delete("/:id", protect, adminOrInstructor, controller.deleteClass);

export default router;

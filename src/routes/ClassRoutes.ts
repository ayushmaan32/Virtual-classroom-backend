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

// Add Unit to Class (Admin/Instructor Only)
router.post(
  "/class/:classId/unit",
  protect,
  adminOrInstructor,
  controller.addUnitToClass
);

// Add Session to Unit (Admin/Instructor Only)
router.post(
  "/unit/:unitId/session",
  protect,
  adminOrInstructor,
  controller.addSessionToUnit
);

// Add Lecture to Session (Admin/Instructor Only)
router.post(
  "/session/:sessionId/lecture",
  protect,
  adminOrInstructor,
  controller.addLectureToSession
);

export default router;

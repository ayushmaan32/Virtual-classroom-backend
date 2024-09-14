import express from "express";
import controller from "../controller/classController";
import {
  adminOrInstructor,
  protect,
  studentAccess,
} from "../middleware/authmiddleware";

const router = express.Router();

// create class
router.post("/", protect, adminOrInstructor, controller.createClass);

// update class
router.put("/:id", protect, adminOrInstructor, controller.updateClass);

// delete class
router.delete("/:id", protect, adminOrInstructor, controller.deleteClass);

// Add Unit to Class (Admin/Instructor Only)
router.post(
  "/:classId/unit",
  protect,
  adminOrInstructor,
  controller.addUnitToClass
);

// route to get unit for each class
router.get("/:classId/unit", protect, controller.getClassWithUnits);

// Add Session to Unit (Admin/Instructor Only)
router.post(
  "/unit/:unitId/session",
  protect,
  adminOrInstructor,
  controller.addSessionToUnit
);

// route to get unit for each class
router.get("/unit/:unitId/session", protect, controller.getUnitWithSessions);

// Add Lecture to Session (Admin/Instructor Only)
router.post(
  "/session/:sessionId/lecture",
  protect,
  adminOrInstructor,
  controller.addLectureToSession
);

// Route to get lectures for a session
router.get(
  "/session/:sessionId/lectures",
  protect,
  controller.getLecturesForSession
);

export default router;

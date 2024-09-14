// classController.ts

import { Request, Response } from "express";
import { Class } from "../models/classModel";
import { Unit } from "../models/unitModel";
import { Lecture } from "../models/letcureModel";
import { Session } from "../models/sessionModel";

// @desc    Create a new class
// @route   POST /api/class
// @access  Admin/Instructor
const createClass = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const instructorId = req.userId; // Instructor is taken from the logged-in user

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newClass = new Class({
      title,
      description,
      instructor: instructorId,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: "Error creating class", error });
  }
};

// @desc    Update class
// @route   PUT /api/class/:id
// @access  Admin/Instructor
const updateClass = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const classId = req.params.id;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { title, description },
      { new: true } // Return updated class
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

// @desc    Delete class
// @route   DELETE /api/class/:id
// @access  Admin/Instructor
const deleteClass = async (req: Request, res: Response) => {
  const classId = req.params.id;

  try {
    const classToDelete = await Class.findByIdAndDelete(classId);

    if (!classToDelete) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};

const addUnitToClass = async (req: Request, res: Response) => {
  const { classId } = req.params;
  const { title } = req.body;

  try {
    const classDoc = await Class.findById(classId);

    if (!classDoc) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newUnit = new Unit({ title, class: classDoc._id });
    await newUnit.save();

    classDoc.units.push(newUnit._id); // Add the unit reference to the class
    await classDoc.save();

    res.status(201).json(newUnit);
  } catch (error) {
    res.status(500).json({ message: "Error adding unit", error });
  }
};

const addSessionToUnit = async (req: Request, res: Response) => {
  const { unitId } = req.params;
  const { title } = req.body;

  try {
    const unitDoc = await Unit.findById(unitId);

    if (!unitDoc) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const newSession = new Session({ title, unit: unitDoc._id });
    await newSession.save();

    unitDoc.sessions.push(newSession._id); // Add session reference to the unit
    await unitDoc.save();

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error });
  }
};

const addLectureToSession = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { title, content } = req.body;

  try {
    const sessionDoc = await Session.findById(sessionId);

    if (!sessionDoc) {
      return res.status(404).json({ message: "Session not found" });
    }

    const newLecture = new Lecture({ title, content, session: sessionDoc._id });
    await newLecture.save();

    sessionDoc.lectures.push(newLecture._id); // Add lecture reference to the session
    await sessionDoc.save();

    res.status(201).json(newLecture);
  } catch (error) {
    res.status(500).json({ message: "Error adding lecture", error });
  }
};

export default {
  createClass,
  updateClass,
  deleteClass,
  addUnitToClass,
  addSessionToUnit,
  addLectureToSession,
};

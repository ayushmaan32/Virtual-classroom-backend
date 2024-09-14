// classController.ts

import { Request, Response } from "express";
import { Class } from "../models/classModel";

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

export default {
  createClass,
  updateClass,
  deleteClass,
};

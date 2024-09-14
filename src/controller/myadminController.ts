import { Request, Response } from "express";
import { User } from "../models/userModel";
import mongoose from "mongoose";

// Admin can update user role
const updateUserRole = async (req: Request, res: Response) => {
  const { userId, role } = req.body; // userId and new role passed by admin

  try {
    // Convert string to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { role },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `User role updated to ${role}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating user role", error });
  }
  //     const user = await User.findById(userId);

  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }

  //     if (["student", "instructor", "admin"].includes(role)) {
  //       user.role = role;
  //       await user.save();
  //       res.status(200).json({ message: `User role updated to ${role}` });
  //     } else {
  //       res.status(400).json({ message: "Invalid role" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Error updating role" });
  //   }
};

export default {
  updateUserRole,
};

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

// Generate JWT token
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

// Register a new user (Admin or Instructor)
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Set default role to 'student'
    let role = "student";

    // Check if email matches the first admin email
    if (
      process.env.FIRST_ADMIN_EMAIL &&
      email === process.env.FIRST_ADMIN_EMAIL
    ) {
      role = "admin"; // Set role to 'admin' for the  admin email
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(String(user._id), user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// User login
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(String(user._id), user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export default {
  registerUser,
  loginUser,
};

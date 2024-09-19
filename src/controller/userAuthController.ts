import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";
import optGenerator from "otp-generator";
import sendResetPassEmail from "../mailer/sendResetPassEmail";
import { otpStore } from "..";
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
    let newrole = "student";

    // Check if email matches the first admin email
    if (
      process.env.FIRST_ADMIN_EMAIL &&
      email === process.env.FIRST_ADMIN_EMAIL
    ) {
      newrole = "admin"; // Set role to 'admin' for the  admin email
    }

    const user = await User.create({
      name,
      email,
      password,
      role: newrole,
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

// const otpStore: Record<string, string> = {};
const generateOTP = (req: Request, res: Response) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  // const otp = Math.floor(100000 + Math.random() * 999999).toString();
  const otp = optGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  otpStore[email] = otp;
  console.log("opt generated", otp);
  console.log("store", otpStore);

  sendResetPassEmail(email, otp);

  return res.status(200).json({
    message: "otp generated and logged",
  });
};

const resetPassword = async (req: Request, res: Response) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    return res.status(401).json({
      message: "Email, OTP, and new password are required",
    });
  }
  console.log(otpStore);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (otpStore[email] === otp) {
    console.log("hello", otp);
    User.updateOne(
      { email: email },
      {
        $set: { password: hashedPassword },
      }
    );
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    return res.status(401).json({
      message: "Invalid OTP",
    });
  }
};
console.log(otpStore);
export default {
  registerUser,
  loginUser,
  generateOTP,
  resetPassword,
};

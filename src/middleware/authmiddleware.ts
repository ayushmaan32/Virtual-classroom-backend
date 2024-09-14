import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

export interface AuthRequest extends Request {
  user?: any;
}

import { IUser } from "../models/userModel"; // Import your user model type

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// Protect routes (require authentication)
export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.sendStatus(404);
      }
      const userId = user._id;
      req.userId = userId.toString();

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin and Instructor can manage classes
export const adminOrInstructor = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "instructor")
  ) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin or instructor" });
  }
};

// Students can only access certain routes (like view classes)
export const studentAccess = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as student" });
  }
};

// admin only validation
export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

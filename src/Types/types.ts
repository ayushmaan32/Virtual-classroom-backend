// classModel.ts
import mongoose, { Document } from "mongoose";
export interface IClass extends Document {
  title: string;
  description: string;
  instructor: mongoose.Schema.Types.ObjectId; // Reference to the User model (Instructor)
  units: mongoose.Schema.Types.ObjectId[]; // Units (Books)
}

export interface ILecture {
  title: string;
  content: string; // Lecture content, could be a video URL or text
  session: mongoose.Schema.Types.ObjectId; // Reference to the Session
}

export interface ISession {
  title: string;
  unit: mongoose.Schema.Types.ObjectId; // Reference to the Unit
  lectures: mongoose.Schema.Types.ObjectId[]; // Reference to Lecture documents
}

export interface IUnit {
  title: string;
  class: mongoose.Schema.Types.ObjectId; // Reference to the Class
  sessions: mongoose.Schema.Types.ObjectId[]; // Reference to Session documents
}
export interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  class: mongoose.Types.ObjectId;
  enrolledAt: Date;
}

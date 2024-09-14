// classModel.ts
import mongoose, { Document, Schema } from "mongoose";
import { IUnit } from "../Types/types";

export interface IClass extends Document {
  title: string;
  description: string;
  instructor: mongoose.Types.ObjectId; // Reference to the User model (Instructor)
  units: IUnit[]; // Units (Books)
}

const classSchema = new Schema<IClass>({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Class = mongoose.model<IClass>("Class", classSchema);

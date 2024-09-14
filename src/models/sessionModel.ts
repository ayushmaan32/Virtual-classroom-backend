import mongoose, { Schema, Document } from "mongoose";
import { ISession } from "../Types/types";

const sessionSchema = new Schema<ISession>(
  {
    title: { type: String, required: true },
    unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }], // References to Lecture documents
  },
  { timestamps: true }
);

export const Session = mongoose.model<ISession>("Session", sessionSchema);

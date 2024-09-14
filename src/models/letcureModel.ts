import mongoose, { Schema, Document } from "mongoose";
import { ILecture } from "../Types/types";

const lectureSchema = new Schema<ILecture>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // Could be text or video URL
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model<ILecture>("Lecture", lectureSchema);

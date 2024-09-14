// classModel.ts
import mongoose, { Schema } from "mongoose";
import { IClass } from "../Types/types";

const classSchema = new Schema<IClass>(
  {
    title: { type: String, required: true },
    description: { type: String },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    units: [{ type: Schema.Types.ObjectId, ref: "Unit" }], // References to Unit documents
  },
  { timestamps: true }
);

export const Class = mongoose.model<IClass>("Class", classSchema);

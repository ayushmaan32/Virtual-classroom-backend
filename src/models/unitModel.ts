import mongoose, { Schema, Document } from "mongoose";
import { IUnit } from "../Types/types";

const unitSchema = new Schema<IUnit>(
  {
    title: { type: String, required: true },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }], // References to Session documents
  },
  { timestamps: true }
);

export const Unit = mongoose.model<IUnit>("Unit", unitSchema);

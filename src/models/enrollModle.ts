import mongoose, { Document, Schema } from "mongoose";
import { IEnrollment } from "../Types/types";

const EnrollmentSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  enrolledAt: { type: Date, default: Date.now },
});

const Enrollment = mongoose.model<IEnrollment>("Enrollment", EnrollmentSchema);

export default Enrollment;

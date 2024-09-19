import mongoose, { Schema } from "mongoose";
import sendResetPassEmail from "../mailer/sendResetPassEmail";

const optSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, //this document will automatically deleted in 5 min
  },
});

optSchema.pre("save", async function (next) {
  console.log("new document save to the database");

  //only sends an email when document is created
  if (this.isNew) {
    // sendResetPassEmail();
  }
  next();
});

export const Otp = mongoose.model("Otp", optSchema);

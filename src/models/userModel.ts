import mongoose from "mongoose";
import bcrypt from "bcryptjs";

type UserRole = "admin" | "instructor" | "student";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole; // Use enum type for role
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"],
    default: "student", // Default role is student
  },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password for login
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);

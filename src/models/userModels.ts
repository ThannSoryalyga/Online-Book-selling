import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, unique: true },
    age: { type: Number, required: true },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IUser>("user", userSchema);

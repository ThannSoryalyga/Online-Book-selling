import mongoose from "mongoose";
import { IAuthor } from "@/types/author";

const authorSchema = new mongoose.Schema<IAuthor>(
  {
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model<IAuthor>("Author", authorSchema);

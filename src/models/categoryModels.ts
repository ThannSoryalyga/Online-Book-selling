import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/category";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model<ICategory>("Category", categorySchema);

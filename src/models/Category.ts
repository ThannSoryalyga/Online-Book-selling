import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    bookId: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;

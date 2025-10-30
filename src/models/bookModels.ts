import mongoose, { Schema } from "mongoose";
import { IBook } from "@/types/book";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    price: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number },
    imageUrl: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);

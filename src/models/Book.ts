import mongoose, { Schema } from "mongoose";
import { IBook } from "@/types/book";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true },
    author: { type: String, required: true, trim: true },
    publisher: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: "" },
    pages: { type: Number, min: 1 },
    language: { type: String, default: "English" },
  },
  { timestamps: true }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;

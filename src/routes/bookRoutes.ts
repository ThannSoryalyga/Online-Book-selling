import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "@/controllers/bookController";

const router = express.Router();

router.post("/create-book", createBook);
router.get("/get-books", getBooks);
router.get("/get-book/:id", getBookById);
router.put("/update-book/:id", updateBook);
router.delete("/delete-book/:id", deleteBook);

export default router;

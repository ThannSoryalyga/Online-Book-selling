import express from "express";
import {
  createBookController,
  deleteBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
} from "@/controllers/bookController";
import { authenticate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-book",
  authenticate,
  authorize(["admin"]),
  createBookController
);
router.get(
  "/get-books",
  authenticate,
  authorize(["admin", "user"]),
  getAllBooksController
);
router.get(
  "/get-book/:id",
  authenticate,
  authorize(["admin"]),
  getBookByIdController
);
router.put(
  "/update-book/:id",
  authenticate,
  authorize(["admin"]),
  updateBookController
);
router.delete(
  "/delete-book/:id",
  authenticate,
  authorize(["admin"]),
  deleteBookController
);

export default router;

import express from "express";
import {
  createAuthorController,
  deleteAuthorController,
  getAllAuthorController,
  getAuthorByIdController,
  updateAuthorController,
} from "@/controllers/authorController";
import { authenticate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-author",
  authenticate,
  authorize(["admin"]),
  createAuthorController
);
router.get(
  "/get-authors",
  authenticate,
  authorize(["admin"]),
  getAllAuthorController
);
router.get(
  "/get-author/:id",
  authenticate,
  authorize(["admin"]),
  getAuthorByIdController
);
router.put(
  "/update-author/:id",
  authenticate,
  authorize(["admin"]),
  updateAuthorController
);
router.delete(
  "/delete-author/:id",
  authenticate,
  authorize(["admin"]),
  deleteAuthorController
);

export default router;

import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
} from "@/controllers/categoryController";
import { authenticate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-category",
  authenticate,
  authorize(["user"]),
  createCategoryController
);
router.get(
  "/get-categories",
  authenticate,
  authorize(["admin"]),
  getAllCategoriesController
);
router.get(
  "/get-category/:id",
  authenticate,
  authorize(["admin"]),
  createCategoryController
);

router.put(
  "/update-category/:id",
  authenticate,
  authorize(["admin"]),
  createCategoryController
);
router.delete(
  "/delete-category/:id",
  authenticate,
  authorize(["admin"]),
  createCategoryController
);
export default router;

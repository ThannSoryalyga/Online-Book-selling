import express from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
} from "@/controllers/categoryController";
import { authenticate, authorize } from "@/middleware/authMiddleware";

const router = express.Router();

router.post(
  "/create-category",
  authenticate,
  authorize(["admin"]),
  createCategoryController
);
router.get(
  "/get-categories",
  authenticate,
  authorize(["admin"]),
  getAllCategoriesController
);

router.put(
  "/update-category/:id",
  authenticate,
  authorize(["admin"]),
  updateCategoryController
);

router.get(
  "/get-category/:id",
  authenticate,
  authorize(["admin"]),
  getCategoryByIdController
);

router.delete(
  "/delete-category/:id",
  authenticate,
  authorize(["admin"]),
  deleteCategoryController
);

export default router;

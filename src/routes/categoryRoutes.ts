import express from "express";
import {
  createCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "@/controllers/categoryController";

const router = express.Router();

router.post("/create-category", createCategoryController);
router.get("/get-categories", getCategoriesController);
router.get("/get-category/:id", getCategoryByIdController);
router.put("/update-category/:id", updateCategoryController);
router.delete("/delete-category/:id", deleteCategoryController);

export default router;

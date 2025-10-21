import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "@/services/categoryService";
import { CreateCategoryInput } from "@/types/category";
import { Request, Response } from "express";

export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryData: CreateCategoryInput = req.body;
    const result = await createCategory(categoryData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create category.",
    });
  }
};

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const result = await getCategories();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to retrieve categories.",
    });
  }
};

export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = req.params.id;
    const result = await getCategoryById(categoryId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to retrieve category.",
    });
  }
};

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;
    const result = await updateCategory(categoryId, updateData);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update category.",
    });
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const result = await deleteCategory(categoryId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete category.",
    });
  }
};

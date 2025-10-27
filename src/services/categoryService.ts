import categorySchema from "@/models/categoryModels";
import { Request, Response } from "express";

export const createCategoryService = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.userId;
    const existingNameCategory = await categorySchema.findOne({ name });
    if (existingNameCategory) {
      return res.status(401).json({
        success: false,
        message: "Category with this name already exists.",
      });
    }

    const newCategory = new categorySchema({
      name,
      description,
      userId,
    });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      data: newCategory,
      message: "Category created successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Category creation failed.",
    });
  }
};

export const getAllCategoriesService = async (req: Request, res: Response) => {
  try {
    const categories = await categorySchema.find().populate("userId");
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch categories.",
    });
  }
};

export const getCategoryByIdService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categorySchema.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch category.",
    });
  }
};

export const updateCategoryService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await categorySchema.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    return res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Category update failed.",
    });
  }
};

export const deleteCategoryService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categorySchema.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Category deletion failed.",
    });
  }
};

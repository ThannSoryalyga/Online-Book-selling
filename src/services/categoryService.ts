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
    res.status(200).json({
      success: true,
      data: categories,
      message: "Categories fetched successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get categories.",
    });
  }
};

export const getCategoryByIdService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const category = await categorySchema
      .findById(categoryId)
      .populate("userId");
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: category,
      message: "Category fetched successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get category.",
    });
  }
};

export const updateCategoryService = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const categoryId = req.params.id;
    const { name, description } = req.body;

    const newcategory = await categorySchema.findByIdAndUpdate(
      {
        _id: categoryId,
      },
      {
        name,
        description,
        userId,
      }
    );
    res.status(201).json({
      success: true,
      data: newcategory,
      message: "Category updated successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "failed to update category.",
    });
  }
};

export const deleteCategoryService = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await categorySchema.findByIdAndDelete({
      _id: categoryId,
    });
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};

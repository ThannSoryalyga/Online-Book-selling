import categorySchema from "@/models/Category";
import { CategoryResult, CreateCategoryInput } from "@/types/category";

export const createCategory = async (
  input: CreateCategoryInput
): Promise<CategoryResult> => {
  try {
    const category = new categorySchema(input);
    const savedCategory = await category.save();
    return {
      success: true,
      data: [savedCategory],
      message: "Category created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to create category",
    };
  }
};
export const getCategories = async (): Promise<CategoryResult> => {
  try {
    const categories = await categorySchema.find();
    return {
      success: true,
      data: categories,
      message: "Categories retrieved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to retrieve categories",
    };
  }
};
export const getCategoryById = async (id: string): Promise<CategoryResult> => {
  try {
    const category = await categorySchema.findById(id);
    if (!category) {
      return {
        success: false,
        data: [],
        message: "Category not found",
      };
    }
    return {
      success: true,
      data: [category],
      message: "Category retrieved successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to retrieve category",
    };
  }
};
export const deleteCategory = async (id: string): Promise<CategoryResult> => {
  try {
    const category = await categorySchema.findByIdAndDelete(id);
    if (!category) {
      return {
        success: false,
        data: [],
        message: "Category not found",
      };
    }
    return {
      success: true,
      data: [category],
      message: "Category deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to delete category",
    };
  }
};
export const updateCategory = async (
  id: string,
  input: Partial<CreateCategoryInput>
): Promise<CategoryResult> => {
  try {
    const category = await categorySchema.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!category) {
      return {
        success: false,
        data: [],
        message: "Category not found",
      };
    }
    return {
      success: true,
      data: [category],
      message: "Category updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.message || "Failed to update category",
    };
  }
};

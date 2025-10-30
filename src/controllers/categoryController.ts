import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "@/services/categoryService";
import e, { Request, Response } from "express";

export const createCategoryController = async (req: Request, res: Response) => {
  const result = await createCategoryService(req, res);
  return res.json(result);
};
export const getAllCategoriesController = async (
  req: Request,
  res: Response
) => {
  const result = await getAllCategoriesService(req, res);
  return res.json(result);
};
export const getCategoryByIdController = async (
  req: Request,
  res: Response
) => {
  const result = await getCategoryByIdService(req, res);
  return res.json(result);
};
export const updateCategoryController = async (req: Request, res: Response) => {
  const result = await updateCategoryService(req, res);
  return res.json(result);
};
export const deleteCategoryController = async (req: Request, res: Response) => {
  const result = await deleteCategoryService(req, res);
  return res.json(result);
};

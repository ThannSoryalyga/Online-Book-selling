import { Request, Response } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getByAuthorId,
  updateAuthor,
} from "@/services/authorService";

export const createAuthorController = async (req: Request, res: Response) => {
  const result = await createAuthor(req, res);
  return result;
};
export const getAllAuthorController = async (req: Request, res: Response) => {
  const result = await getAllAuthor(req, res);
  return result;
};
export const getAuthorByIdController = async (req: Request, res: Response) => {
  const result = await getByAuthorId(req, res);
  return result;
};
export const updateAuthorController = async (req: Request, res: Response) => {
  const result = await updateAuthor(req, res);
  return result;
};
export const deleteAuthorController = async (req: Request, res: Response) => {
  const result = await deleteAuthor(req, res);
  return result;
};

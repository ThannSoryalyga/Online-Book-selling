import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "@/services/bookService";
import { Request, Response } from "express";

export const createBookController = async (req: Request, res: Response) => {
  const result = await createBook(req, res);
  return result;
};
export const getAllBooksController = async (req: Request, res: Response) => {
  const result = await getAllBooks(req, res);
  return result;
};
export const getBookByIdController = async (req: Request, res: Response) => {
  const result = await getBookById(req, res);
  return result;
};
export const updateBookController = async (req: Request, res: Response) => {
  const result = await updateBook(req, res);
  return result;
};
export const deleteBookController = async (req: Request, res: Response) => {
  const result = await deleteBook(req, res);
  return result;
};

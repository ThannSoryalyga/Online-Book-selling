import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
} from "@/services/bookService";
import { CreateBookInput } from "@/types/book";
import e, { Request, Response } from "express";

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData: CreateBookInput = req.body;
    const result = await createBookService(bookData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create book.",
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await getAllBooksService();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch books.",
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const result = await getBookByIdService(bookId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch book.",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;
    const result = await updateBookService(bookId, updateData);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update book.",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const result = await deleteBookService(bookId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete book.",
    });
  }
};

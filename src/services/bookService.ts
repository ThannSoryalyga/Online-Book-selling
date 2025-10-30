import bookShema from "@/models/bookModels";
import { Request, Response } from "express";
export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      authorId,
      price,
      categoryId,
      stock,
      imageUrl,
      publishYear,
    } = req.body;
    const userId = req.user?.userId;
    const newBook = new bookShema({
      title,
      description,
      authorId,
      publisher: userId,
      price,
      categoryId,
      stock,
      imageUrl,
      publishYear,
    });
    if (stock <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ error: "Stock and Price must be greater than zero" });
    }

    await newBook.save();

    res
      .status(201)
      .json({ data: newBook, message: "Book created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }
    const books = await bookShema
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("authorId")
      .populate("publisher")
      .populate("categoryId");

    const totalBooks = await bookShema.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limit);
    res.status(200).json({
      success: true,
      data: books,
      meta: {
        page,
        limit,
        totalBooks,
        totalPages,
      },
      message: "Books fetched successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await bookShema
      .findById(id)
      .populate("authorId")
      .populate("publisher")
      .populate("categoryId");
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    }
    res.status(200).json({
      success: true,
      data: book,
      message: "Book fetched successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      authorId,
      price,
      categoryId,
      stock,
      imageUrl,
      publishYear,
    } = req.body;
    const userId = req.user?.userId;
    const newBook = await bookShema.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        authorId,
        publisher: userId,
        price,
        categoryId,
        stock,
        imageUrl,
        publishYear,
      },
      { new: true }
    );
    if (stock <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ error: "Stock and Price must be greater than zero" });
    }
    res
      .status(201)
      .json({ data: newBook, message: "Book created successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const Id = req.params.id;
    const deletedBook = await bookShema.findByIdAndDelete({
      _id: Id,
    });
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};

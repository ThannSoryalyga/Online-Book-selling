import bookSchema from "@/models/Book";
import { BookResult, CreateBookInput } from "@/types/book";

export const createBookService = async (
  bookData: CreateBookInput
): Promise<BookResult> => {
  try {
    const newBook = new bookSchema(bookData);
    const savedBook = await newBook.save();
    return {
      success: true,
      data: savedBook,
      message: "Book created successfully.",
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to create book.",
    };
  }
};

export const getBooksService = async (): Promise<BookResult> => {
  try {
    const books = await bookSchema.find();
    return {
      success: true,
      data: books,
      message: "Books fetched successfully.",
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to fetch books.",
    };
  }
};

export const getBookByIdService = async (id: string): Promise<BookResult> => {
  try {
    const book = await bookSchema.findById(id);
    if (!book) {
      return {
        success: false,
        data: null as any,
        message: "Book not found.",
      };
    }

    return {
      success: true,
      data: book,
      message: "Book fetched successfully.",
    };
  } catch (error) {
    console.error("Error fetching book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to fetch book.",
    };
  }
};
export const updateBookService = async (
  id: string,
  updateData: Partial<CreateBookInput>
): Promise<BookResult> => {
  try {
    const updatedBook = await bookSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBook) {
      return {
        success: false,
        data: null as any,
        message: "Book not found.",
      };
    }
    return {
      success: true,
      data: updatedBook,
      message: "Book updated successfully.",
    };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to update book.",
    };
  }
};

export const deleteBookService = async (id: string): Promise<BookResult> => {
  try {
    const deletedBook = await bookSchema.findByIdAndDelete(id);
    if (!deletedBook) {
      return {
        success: false,
        data: null as any,
        message: "Book not found.",
      };
    }
    return {
      success: true,
      data: deletedBook,
      message: "Book deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting book:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to delete book.",
    };
  }
};

export default {
  createBookService,
  getBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
};

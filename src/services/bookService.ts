import bookSchema from "@/models/bookModels";
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

export const getAllBooksService = async (): Promise<BookResult[]> => {
  try {
    const books = await bookSchema.find();
    return books.map((book) => ({
      success: true,
      data: book,
    }));
  } catch (error) {
    console.error("Error fetching all books:", error);
    return [
      {
        success: false,
        data: null as any,
        message: "Failed to fetch books.",
      },
    ];
  }
};

export const getBookByIdService = async (
  bookId: string
): Promise<BookResult> => {
  try {
    const book = await bookSchema.findById(bookId);
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
    };
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    return {
      success: false,
      data: null as any,
      message: "Failed to fetch book.",
    };
  }
};
export const updateBookService = async (
  bookId: string,
  updateData: Partial<CreateBookInput>
): Promise<BookResult> => {
  try {
    const updatedBook = await bookSchema.findByIdAndUpdate(bookId, updateData, {
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
export const deleteBookService = async (
  bookId: string
): Promise<BookResult> => {
  try {
    const deletedBook = await bookSchema.findByIdAndDelete(bookId);
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

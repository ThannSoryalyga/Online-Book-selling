import authorSchema from "@/models/authorModels";
import { Request, Response } from "express";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, phone, dob } = req.body; // body request
    const userId = req.user?.userId; //header need Id user
    const exitName = await authorSchema.findOne({ name }); // exit name author
    if (exitName) {
      return res.status(404).json({
        success: false,
        message: "Author with this name already exists.",
      });
    }
    const exitPhone = await authorSchema.findOne({ phone }); //exit phone author
    if (exitPhone) {
      return res.status(404).json({
        success: false,
        message: "Author with this phone already exists.",
      });
    }
    const newAuthor = new authorSchema({
      name,
      phone,
      dob,
      userId,
    });
    await newAuthor.save(); // save new author
    res
      .status(201)
      .json({ data: newAuthor, message: "Author created successfully" }); // respone success
  } catch (error: any) {
    res.status(500).json({ error: "Internal Server Error" }); // catch error
  }
};

export const getAllAuthor = async (req: Request, res: Response) => {
  try {
    const authors = await authorSchema.find().populate("userId"); // populate catch user data by userId
    res.status(200).json({
      success: true,
      data: authors,
      message: "Authors fetched successfully.", // respone success
    });
  } catch (error: any) {
    res.status(500).json({ message: "get all author fail" }); //respone fail
  }
};

export const getByAuthorId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // catch author id using param
    const author = await authorSchema.findById(id).populate("userId"); // populate catch user data by userId
    if (!author) {
      // if don't have author respone not found
      return res.status(404).json({
        success: false,
        message: " not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: author,
      message: "Author fetched successfully.", // respone success
    });
  } catch (error: any) {
    res.status(500).json({ message: "get all author fail" }); //respone fail
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const id = req.params.id;
    const { name, phone, dob } = req.body;

    const newAuthorUpdate = await authorSchema.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        phone,
        dob,
        userId,
      }
    );
    res.status(201).json({
      success: true,
      data: newAuthorUpdate,
      message: "Author updated successfully.",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "failed to update author.",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const Id = req.params.id;
    const deleted = await authorSchema.findByIdAndDelete({
      _id: Id,
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "author not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Author deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete author.",
    });
  }
};

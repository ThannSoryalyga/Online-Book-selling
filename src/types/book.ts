import { Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  description: string;
  authorId: object | string;
  publisher: string | object;
  price: number;
  categoryId: object | string;
  stock: number;
  imageUrl: string;
  publishYear: number;
  createAt: Date;
  updatedAt: Date;
}

import { Document } from "mongoose";

export interface IAuthor extends Document {
  _id: string;
  userId: object;
  name: string;
  phone: string;
  dob: string;
  createdAt?: Date;
  updatedAt?: Date;
}

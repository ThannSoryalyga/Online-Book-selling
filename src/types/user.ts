import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  phone?: string;
  age?: number;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

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
// export interface CreateUserInput {
//   email: string;
//   firstName: string;
//   lastName: string;
//   userName: string;
//   password: string;
//   phone?: string;
//   age?: number;
// }
// export interface UserResult {
//   success: boolean;
//   data: IUser;
//   message?: string;
// }

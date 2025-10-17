export interface IUser {
  _id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  phone: number;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegisterInput {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  phone: number;
  age: number;
}
export interface LoginInput {
  email: string;
  password: string;
}
export interface AuthResult {
  success: boolean;
  data: IUser | null;
  message?: string;
}

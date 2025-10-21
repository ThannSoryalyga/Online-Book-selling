export interface ICategory {
  _id?: string;
  userId: string;
  bookId: string;
  name: string;
}
export interface CreateCategoryInput {
  userId: string;
  bookId: string;
  name: string;
}
export interface CategoryResult {
  success: boolean;
  data: ICategory[];
  message: string;
}

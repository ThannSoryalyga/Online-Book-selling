export interface Icart {
  _id?: string;
  userId: string;
  bookId: string;
  quantity: number;
  addedAt: Date;
}
export interface addCartInput {
  userId: string;
  bookId: string;
  quantity?: number;
}
export interface CartResult {
  success: boolean;
  data: Icart[];
  message?: string;
}

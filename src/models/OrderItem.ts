import { Schema, model, Types } from "mongoose";

interface IOrderItem {
  orderId: Types.ObjectId;
  bookId: Types.ObjectId;
  quantity: number;
  totalPrice: number;
  sellPrice: number;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    orderId: { type: Schema.Types.ObjectId, required: true, ref: "Order" },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const OrderItem = model<IOrderItem>("OrderItem", orderItemSchema);

export default OrderItem;

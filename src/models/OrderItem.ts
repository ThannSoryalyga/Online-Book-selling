import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem extends Document {
  orderId: mongoose.Types.ObjectId;
  bookID: mongoose.Types.ObjectId;
  quantity: number;
  sellPrice: number;
  totalPrice: number;
}

const OrderItemSchema: Schema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Books",
    },
    quantity: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model<IOrderItem>("OrderItem", OrderItemSchema);

export default OrderItem;

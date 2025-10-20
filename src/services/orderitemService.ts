import OrderItem, { IOrderItem } from "../models/OrderItem";

export const createOrderItem = async (data: {
  orderId: string;
  bookId: string;
  quantity: number;
  sellPrice: number;
  totalPrice: number;
}): Promise<IOrderItem> => {
  const orderItem = await OrderItem.create(data);
  return orderItem;
};

export const getOrderItemService = async (): Promise<IOrderItem[]> => {
  const orderItems = await OrderItem.find()
    .populate("bookId")
    .populate("orderId")
    .populate("quantity")
    .populate("sellPrice")
    .populate("totalPrice");

  return orderItems;
};

import { Request, Response } from "express";
import OrderItem from "../models/OrderItem";

// Create OrderItem
export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderId, bookId, quantity, sellPrice } = req.body;

    if (!orderId || !bookId || !quantity || !sellPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const totalPrice = quantity * sellPrice;

    const orderItem = await OrderItem.create({
      orderId,
      bookId,
      quantity,
      sellPrice,
      totalPrice,
    });

    res.status(201).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order item", error });
  }
};

// Get all OrderItems
export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const orderItems = await OrderItem.find()
      .populate("bookId")
      .populate("orderId");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order items", error });
  }
};

// Get OrderItems by Order
export const getOrderItemsByOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItem.find({ orderId }).populate("bookId");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order items", error });
  }
};

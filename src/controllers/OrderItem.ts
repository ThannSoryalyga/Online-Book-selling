import { Request, Response } from "express";
import OrderItem from "../models/OrderItem";
import { access } from "fs";

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const { orderId, bookId, quantity, sellPrice, totalPrice } = req.body;
    const newOrderItem = new OrderItem({
      orderId,
      bookId,
      quantity,
      sellPrice,
      totalPrice,
    });
    const savedOrderItem = await newOrderItem.save();
    res.status(201).json({
      message: "Order item created successfully",
      data: {
        orderId: savedOrderItem.orderId,
        quantity: savedOrderItem.quantity,
        sellPrice: savedOrderItem.sellPrice,
        totalPrice: savedOrderItem.totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getOrderItemById = async (req: Request, res: Response) => {
  try {
    const items = await OrderItem.find()
      .populate("bookId")
      .populate("orderId")
      .populate("quantity")
      .populate("sellPrice")
      .populate("totalPrice");
    res.status(200).json({
      message: "Order items fetched successfully",
      data: {
        orderId: req.params.id,
        bookId: req.params.id,
        quantity: req.params.quantity,
        sellPrice: req.params.sellPrice,
        totalPrice: req.params.totalPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

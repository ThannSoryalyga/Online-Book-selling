import {
  addToCartService,
  getCartByIdService,
  getCartByUserIdService,
  removeFromCartService,
} from "@/services/cartService";
import e, { Request, Response } from "express";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const cartData = req.body;
    const result = await addToCartService(cartData);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart.",
    });
  }
};

export const getCartByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await getCartByUserIdService(userId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart.",
    });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId;
    const result = await getCartByIdService(cartId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cart.",
    });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.cartId;
    const result = await removeFromCartService(cartId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart.",
    });
  }
};

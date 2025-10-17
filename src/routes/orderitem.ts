import express from "express";
import {
  createOrderItem,
  getOrderItems,
  getOrderItemsByOrder,
} from "../controllers/OrderItem";

const router = express.Router();

// Create a new order item
router.post("/create", createOrderItem);

// Get all order items
router.get("/", getOrderItems);

// Get all order items for a specific order
router.get("/order/:orderId", getOrderItemsByOrder);

export default router;

import express from "express";
import { createOrderItem, getOrderItemById } from "../controllers/OrderItem";

const router = express.Router();

router.post("/order-items", createOrderItem);
router.get("/:id", getOrderItemById);
export default router;

import express from "express";
import {
  addToCart,
  getCartById,
  getCartByUserId,
  removeFromCart,
} from "@/controllers/cartController";

const router = express.Router();

router.post("/add-to-cart", addToCart);
router.get("/cart/user/:userId", getCartByUserId);
router.get("/cart/:cartId", getCartById);
router.delete("/remove/:cartId", removeFromCart);

export default router;

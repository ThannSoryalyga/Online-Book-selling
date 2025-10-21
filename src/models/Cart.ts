import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const cart = mongoose.models.Card || mongoose.model("Card", cartSchema);
export default cart;

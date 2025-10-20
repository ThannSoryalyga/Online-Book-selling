import cartSchema from "@/models/Cart";
import { CartResult, addCartInput } from "@/types/cart";

export const addToCartService = async (
  cartData: addCartInput
): Promise<CartResult> => {
  try {
    const newCart = new cartSchema(cartData);
    const savedCart = await newCart.save();
    return {
      success: true,
      data: savedCart,
      message: "Item added to cart successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: "Failed to add item to cart.",
    };
  }
};

export const getCartByUserIdService = async (
  userId: string
): Promise<CartResult> => {
  try {
    const cart = await cartSchema.find({ userId });
    if (!cart) {
      return {
        success: false,
        data: null as any,
        message: "Cart not found.",
      };
    }
    return {
      success: true,
      data: cart,
      message: "Cart retrieved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null as any,
      message: "Failed to retrieve cart.",
    };
  }
};

export const getCartByIdService = async (
  cartId: string
): Promise<CartResult> => {
  try {
    const cart = await cartSchema.find({ cartId });
    if (!cart) {
      return {
        success: false,
        data: null as any,
        message: "Cart not found.",
      };
    }
    return {
      success: true,
      data: cart,
      message: "Cart retrieved successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: null as any,
      message: "Failed to retrieve cart.",
    };
  }
};

export const removeFromCartService = async (
  cartId: string
): Promise<CartResult> => {
  try {
    const deletedCart = await cartSchema.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return {
        success: false,
        data: [],
        message: "Cart not found.",
      };
    }
    return {
      success: true,
      data: [deletedCart],
      message: "removed from cart successfully.",
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Failed to remove item from cart.",
    };
  }
};

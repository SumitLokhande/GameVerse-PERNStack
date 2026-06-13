// Cart Slice
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { type CartItem } from "../../types/authTypes";

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (cartItems: CartItem[]) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // const existingItem = state.cartItems.find(
      //   (item) => item.id === action.payload.id,
      // );
      // if (existingItem) {
      //   existingItem.quantity += action.payload.quantity;
      // }
      console.log(action, "state in addToCart");
      state.cartItems.push(action.payload);
      Object.assign(state, calculateTotals(state.cartItems));
      toast.success("Game added to cart");
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      Object.assign(state, calculateTotals(state.cartItems));
      toast.info("Game removed from cart");
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      Object.assign(state, calculateTotals(state.cartItems));
      toast.success("Cart updated");
    },
    clearCart: (state) => {
      state.cartItems = [];
      Object.assign(state, calculateTotals(state.cartItems));
      toast.info("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

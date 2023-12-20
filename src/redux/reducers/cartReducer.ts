import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartItem } from "../../types/Cart/CartItem";
import { Product } from "../../types/Product/Product";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Product>) => {
      const cartItem: CartItem = { amount: 1, product: action.payload };
      const itemIndex = state.findIndex(
        (i) => i.product.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state[itemIndex].amount++;
      } else {
        state.push(cartItem);
      }
    },
    reduceCart: (state, action: PayloadAction<Product>) => {
      const itemIndex = state.findIndex(
        (i) => i.product.id === action.payload.id && i.amount > 1
      );
      if (itemIndex !== -1) {
        state[itemIndex].amount--;
      }
    },
    deleteCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.findIndex((i) => i.product.id === action.payload);
      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
    updateCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.findIndex(
        (i) => i.product.id === action.payload.product.id
      );
      if (itemIndex !== -1) {
        state[itemIndex].amount = action.payload.amount;
      }
    },
    clearCart: () => {
      return initialState;
    },
  },
});

const cartReducer = cartSlice.reducer;
export const { addCart, reduceCart, deleteCart, updateCart, clearCart } =
  cartSlice.actions;

export default cartReducer;

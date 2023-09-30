import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import { CartItem } from "../types/Cart/CartItem";

const preCartReducer: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    cartReducer,
  },
  preloadedState: {
    cartReducer: preCartReducer,
  },
});

const updateLocalStorage = () => {
  const cart = store.getState().cartReducer;
  localStorage.setItem("cart", JSON.stringify(cart));
};

store.subscribe(updateLocalStorage);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

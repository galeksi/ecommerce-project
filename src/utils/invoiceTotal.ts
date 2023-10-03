import { CartItem } from "../types/Cart/CartItem";

export const invoiceTotal = (cart: CartItem[]) => {
  const sumTotal = cart.reduce(
    (sum, item) => sum + item.amount * item.product.price,
    0
  );
  return sumTotal;
};

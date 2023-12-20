// import cartReducer, {
//   addCart,
//   clearCart,
//   deleteCart,
//   reduceCart,
//   updateCart,
// } from "../../../redux/reducers/cartReducer";
// import { CartItem } from "../../../types/Cart/CartItem";
// import { mockCart } from "../../mockData/mockCart";
// import { mockProducts } from "../../mockData/mockProducts";

// let cart: CartItem[];

// describe("cart reducer", () => {
//   beforeEach(() => {
//     cart = mockCart;
//   });

//   test("should add one product to cart", () => {
//     const newCart = cartReducer(cart, addCart(mockProducts[2]));

//     expect(cart).toHaveLength(2);
//     expect(newCart).toHaveLength(3);
//     expect(newCart[2].product).toBe(mockProducts[2]);
//     expect(newCart[2].amount).toBe(1);
//   });

//   test("should clear whole cart", () => {
//     const newCart = cartReducer(cart, clearCart());

//     expect(newCart).toHaveLength(0);
//   });

//   test("should only increase amount for same product", () => {
//     const newCart = cartReducer(cart, addCart(mockProducts[0]));

//     expect(cart[0].amount).toBe(1);
//     expect(newCart[0].amount).toBe(2);
//   });

//   test("should decrease existing product by one", () => {
//     const newCart = cartReducer(cart, reduceCart(mockProducts[1]));

//     expect(cart[1].amount).toBe(2);
//     expect(newCart[1].amount).toBe(1);
//   });

//   test("should not decrease if amount is one", () => {
//     const newCart = cartReducer(cart, reduceCart(mockProducts[0]));

//     expect(cart[0].amount).toBe(1);
//     expect(newCart[0].amount).toBe(1);
//   });

//   test("should delete complete cart item", () => {
//     const newCart = cartReducer(cart, deleteCart(mockProducts[1].id));

//     expect(newCart).toHaveLength(1);
//     expect(newCart[0].product.id).toBe(1);
//   });

//   test("should update item amount", () => {
//     let mockProduct: CartItem = { ...mockCart[0], amount: 10 };
//     const newCart = cartReducer(cart, updateCart(mockProduct));

//     expect(newCart[0].amount).toBe(10);
//   });
// });
export {};

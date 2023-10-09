import {
  fetchAllProductsAsync,
  sortByPrice,
} from "../../../redux/reducers/productsReducer";
import store from "../../../redux/store";
import { ProductState } from "../../../types/Product/ProductState";
import { mockProducts } from "../../mockData/mockProducts";

describe("Product reducer", () => {
  let initialProductState: ProductState;
  let stateAfter: ProductState;

  beforeEach(() => {
    store.dispatch(fetchAllProductsAsync.fulfilled(mockProducts, "fulfilled"));
    initialProductState = store.getState().productsReducer;
  });

  test("should have three products initially", () => {
    stateAfter = store.getState().productsReducer;
    expect(stateAfter).toBe(initialProductState);
    expect(stateAfter.products).toHaveLength(3);
  });

  test("should sort products by ascending price", () => {
    store.dispatch(sortByPrice("asc"));
    stateAfter = store.getState().productsReducer;

    expect(stateAfter.products[0]).toBe(initialProductState.products[1]);
    expect(stateAfter.products[2]).toBe(initialProductState.products[2]);
  });

  test("should sort products by descending price", () => {
    store.dispatch(sortByPrice("desc"));
    stateAfter = store.getState().productsReducer;

    expect(stateAfter.products[0]).toBe(initialProductState.products[2]);
    expect(stateAfter.products[2]).toBe(initialProductState.products[1]);
  });
});

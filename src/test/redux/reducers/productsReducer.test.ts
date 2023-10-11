import productsReducer, {
  addProductAsync,
  clearProductError,
  clearProductSuccess,
  deleteProductAsync,
  fetchAllProductsAsync,
  sortByPrice,
  updateProductAsync,
} from "../../../redux/reducers/productsReducer";
import { createStore } from "../../../redux/store";
import { NewProduct } from "../../../types/Product/NewProduct";
import { ProductState } from "../../../types/Product/ProductState";
import { ProductUpdate } from "../../../types/Product/ProductUpdate";
import { mockProducts } from "../../mockData/mockProducts";
import server from "../../shared/server";

let store = createStore();
let initialProductState: ProductState;

beforeAll(() => server.listen());

beforeEach(() => {
  store = createStore();
  store.dispatch(fetchAllProductsAsync.fulfilled(mockProducts, "fulfilled"));
  initialProductState = store.getState().productsReducer;
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Product reducer", () => {
  test("should have three products initially", () => {
    const stateAfter = store.getState().productsReducer;

    expect(stateAfter).toBe(initialProductState);
    expect(stateAfter.products).toHaveLength(3);
  });

  test("should sort products by ascending price", () => {
    store.dispatch(sortByPrice("asc"));
    const stateAfter = store.getState().productsReducer;

    expect(stateAfter.products[0]).toBe(initialProductState.products[1]);
    expect(stateAfter.products[2]).toBe(initialProductState.products[2]);
  });

  test("should sort products by descending price", () => {
    store.dispatch(sortByPrice("desc"));
    const stateAfter = store.getState().productsReducer;

    expect(stateAfter.products[0]).toBe(initialProductState.products[2]);
    expect(stateAfter.products[2]).toBe(initialProductState.products[1]);
  });

  test("should clear error message", () => {
    const errorState = { ...initialProductState, error: "error" };
    const stateAfter = productsReducer(errorState, clearProductError());

    expect(stateAfter.error).toBe("");
  });

  test("should clear success message", () => {
    const successState = { ...initialProductState, success: "success" };
    const stateAfter = productsReducer(successState, clearProductSuccess());

    expect(stateAfter.success).toBe("");
  });

  test("should fetch all products", async () => {
    const result = await store.dispatch(fetchAllProductsAsync());
    const stateAfter = store.getState().productsReducer;

    expect(result.payload).toHaveLength(2);
    expect(stateAfter.products).toHaveLength(2);
  });

  test("should add new product", async () => {
    const newProduct: NewProduct = {
      title: "New test product",
      price: 100,
      description: "Test product description",
      images: ["https://i.imgur.com/fpT4052.jpeg"],
      categoryId: 3,
    };
    const result = await store.dispatch(addProductAsync(newProduct));
    const stateAfter = store.getState().productsReducer;

    expect(stateAfter.products).toHaveLength(4);
    expect(stateAfter.products[3]).toBe(result.payload);
    expect(stateAfter.loading).toBeFalsy();
    expect(stateAfter.error).toBe("");
    expect(stateAfter.success).toContain("was added");
  });

  test("should update existing product", async () => {
    const updateProduct: ProductUpdate = {
      id: 1,
      title: "New update product",
      description: "Test update product description",
    };
    const result = await store.dispatch(updateProductAsync(updateProduct));
    const stateAfter = store.getState().productsReducer;

    expect(stateAfter.products).toHaveLength(3);
    expect(stateAfter.products[0]).toBe(result.payload);
    expect(stateAfter.loading).toBeFalsy();
    expect(stateAfter.error).toBe("");
    expect(stateAfter.success).toContain("was updated");
  });

  test("should delete an existing product", async () => {
    const result = await store.dispatch(deleteProductAsync(3));
    const stateAfter = store.getState().productsReducer;

    expect(result.payload).toBe(3);
    expect(stateAfter.products).toHaveLength(2);
  });

  test("should not delete with wrong id", async () => {
    const result = await store.dispatch(deleteProductAsync(4));
    const stateAfter = store.getState().productsReducer;

    expect(result.payload).toContain("status code 400");
    expect(stateAfter.products).toHaveLength(3);
  });
});

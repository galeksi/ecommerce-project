import { UserState } from "../../../types/User/UserState";
import { createStore } from "../../../redux/store";
import server from "../../shared/server";
import userReducer, {
  clearUserError,
  clearUserSuccess,
} from "../../../redux/reducers/userReducer";

let store = createStore();
let initialUserState: UserState;

beforeAll(() => server.listen());

beforeEach(() => {
  store = createStore();
  initialUserState = store.getState().userReducer;
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("User reducer", () => {
  test("should clear error message", () => {
    const errorState = { ...initialUserState, error: "error" };
    const stateAfter = userReducer(errorState, clearUserError());

    expect(stateAfter.error).toBe("");
  });

  test("should clear success message", () => {
    const successState = { ...initialUserState, success: "success" };
    const stateAfter = userReducer(successState, clearUserSuccess());

    expect(stateAfter.success).toBe("");
  });

  // test("should fetch all users", async () => {
  //   const result = await store.dispatch(fetchAllUsersAsync());
  //   const stateAfter = store.getState().userReducer;

  //   expect(result.payload).toHaveLength(2);
  //   expect(stateAfter.users).toHaveLength(2);
  // });

  // test("should add new product", async () => {
  //   const newProduct: NewProduct = {
  //     title: "New test product",
  //     price: 100,
  //     description: "Test product description",
  //     images: ["https://i.imgur.com/fpT4052.jpeg"],
  //     categoryId: 3,
  //   };
  //   const result = await store.dispatch(addProductAsync(newProduct));
  //   const stateAfter = store.getState().productsReducer;

  //   expect(stateAfter.products).toHaveLength(4);
  //   expect(stateAfter.products[3]).toBe(result.payload);
  //   expect(stateAfter.loading).toBeFalsy();
  //   expect(stateAfter.error).toBe("");
  //   expect(stateAfter.success).toContain("was added");
  // });

  // test("should update existing product", async () => {
  //   const updateProduct: ProductUpdate = {
  //     id: 1,
  //     title: "New update product",
  //     description: "Test update product description",
  //   };
  //   const result = await store.dispatch(updateProductAsync(updateProduct));
  //   console.log(result.payload);

  //   const stateAfter = store.getState().productsReducer;

  //   expect(stateAfter.products).toHaveLength(3);
  //   expect(stateAfter.products[0]).toBe(result.payload);
  //   expect(stateAfter.loading).toBeFalsy();
  //   expect(stateAfter.error).toBe("");
  //   expect(stateAfter.success).toContain("was updated");
  // });

  // test("should delete an existing product", async () => {
  //   const result = await store.dispatch(deleteProductAsync(3));
  //   const stateAfter = store.getState().productsReducer;

  //   expect(result.payload).toBe(3);
  //   expect(stateAfter.products).toHaveLength(2);
  // });

  // test("should not delete with wrong id", async () => {
  //   const result = await store.dispatch(deleteProductAsync(4));
  //   const stateAfter = store.getState().productsReducer;

  //   expect(result.payload).toContain("status code 400");
  //   expect(stateAfter.products).toHaveLength(3);
  // });
});

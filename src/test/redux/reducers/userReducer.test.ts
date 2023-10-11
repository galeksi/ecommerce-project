import { UserState } from "../../../types/User/UserState";
import { createStore } from "../../../redux/store";
import server from "../../shared/server";
import userReducer, {
  authenticateUserAsync,
  clearUserError,
  clearUserSuccess,
  fetchAllUsersAsync,
  loginUserAsync,
} from "../../../redux/reducers/userReducer";
import { mockToken } from "../../mockData/mockToken";
import { mockUsers } from "../../mockData/mockUsers";

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

  test("should fetch all users", async () => {
    await store.dispatch(fetchAllUsersAsync());
    const stateAfter = store.getState().userReducer;

    expect(stateAfter.users).toHaveLength(3);
    expect(stateAfter.loading).toBeFalsy();
    expect(stateAfter.error).toBe("");
  });

  test("should authenticate user", async () => {
    const result = await store.dispatch(authenticateUserAsync(mockToken));
    const stateAfter = store.getState().userReducer;

    expect(result.payload).toEqual(mockUsers[2]);
    expect(stateAfter.currentUser).toEqual(mockUsers[2]);
    expect(stateAfter.loading).toBeFalsy();
    expect(stateAfter.error).toBe("");
  });

  test("should not authenticate falsy token", async () => {
    const result = await store.dispatch(authenticateUserAsync("falsyToken"));
    const stateAfter = store.getState().userReducer;

    expect(result.payload).toContain("status code 400");
    expect(stateAfter.currentUser).toBeUndefined();
    expect(stateAfter.error).toContain("status code 400");
  });

  test("should login user", async () => {
    const credentials = {
      email: mockUsers[2].email,
      password: mockUsers[2].password,
    };
    const result = await store.dispatch(loginUserAsync(credentials));
    const stateAfter = store.getState().userReducer;

    expect(result.payload).toEqual(mockUsers[2]);
    expect(stateAfter.currentUser).toEqual(mockUsers[2]);
    expect(stateAfter.loading).toBeFalsy();
    expect(stateAfter.error).toBe("");
  });

  test("should not login user with wrong credentials", async () => {
    const credentials = {
      email: mockUsers[2].email,
      password: "wrong",
    };
    const result = await store.dispatch(loginUserAsync(credentials));
    const stateAfter = store.getState().userReducer;

    expect(result.payload).toContain("status code 400");
    expect(stateAfter.currentUser).toBeUndefined();
    expect(stateAfter.error).toContain("status code 400");
  });

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

import categoriesReducer, {
  clearCategoryError,
  fetchAllCategoriesAsync,
} from "../../../redux/reducers/categorysReducer";
import { createStore } from "../../../redux/store";
import { CategoryState } from "../../../types/Category/CategoryState";
import server from "../../shared/server";

let store = createStore();
let initialCategoryState: CategoryState;

beforeAll(() => server.listen());

beforeEach(() => {
  store = createStore();
  initialCategoryState = store.getState().categoriesReducer;
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Category reducer", () => {
  test("should have no items initially", () => {
    const stateAfter = store.getState().categoriesReducer;

    expect(stateAfter).toBe(initialCategoryState);
    expect(stateAfter.categories).toHaveLength(0);
  });

  test("should clear error message", () => {
    const errorState = { ...initialCategoryState, error: "error" };
    const stateAfter = categoriesReducer(errorState, clearCategoryError());

    expect(stateAfter.error).toBe("");
  });

  test("should fetch all categories", async () => {
    const result = await store.dispatch(fetchAllCategoriesAsync());
    const stateAfter = store.getState().categoriesReducer;

    expect(result.payload).toHaveLength(5);
    expect(stateAfter.categories).toHaveLength(5);
    expect(stateAfter.error).toBe("");
    expect(stateAfter.loading).toBeFalsy();
  });
});

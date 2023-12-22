import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../types/Category/CategoryState";
import { Category } from "../../types/Category/Category";
import { baseUrl } from "../shared/baserUrl";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: "",
};

export const fetchAllCategoriesAsync = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("fetchAllCategoriesAsync", async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${baseUrl}/categories`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      });
  },
});

const categoriesReducer = categorySlice.reducer;
export const { clearCategoryError } = categorySlice.actions;
export default categoriesReducer;

import axios, { AxiosError } from "axios";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";
import { ProductState } from "../../types/Product/ProductState";
import { NewProduct } from "../../types/Product/NewProduct";
import { ProductUpdate } from "../../types/Product/ProductUpdate";
import { ProductQuery } from "../../types/Product/ProductQuery";
import { baseUrl } from "../shared/baserUrl";

const initialState: ProductState = {
  products: [],
  productCount: 0,
  loading: false,
  error: "",
  success: "",
};

export const fetchAllProductsAsync = createAsyncThunk<
  ProductQuery,
  void,
  { rejectValue: string }
>("fetchAllProductsAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const addProductAsync = createAsyncThunk<
  Product,
  { token: string; data: NewProduct },
  { rejectValue: string }
>("addProductAsync", async ({ token, data }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/products`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const updateProductAsync = createAsyncThunk<
  Product,
  { token: string; data: ProductUpdate },
  { rejectValue: string }
>("updateProductAsync", async ({ token, data }, { rejectWithValue }) => {
  try {
    const { id, ...updateData } = data;
    const response = await axios.patch(
      `${baseUrl}/products/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteProductAsync = createAsyncThunk<
  string,
  { token: string; id: string },
  { rejectValue: string }
>("deleteProductAsync", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseUrl}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data === true ? id : "";
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
    clearProductError: (state) => {
      state.error = "";
    },
    clearProductSuccess: (state) => {
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.productCount = action.payload.totalCount;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.success = `Product ${action.payload.title} was added.`;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updateIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products[updateIndex] = action.payload;
        state.success = `Product ${action.payload.title} was updated.`;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== "") {
          const deleteIndex = state.products.findIndex(
            (p) => p.id === action.payload
          );
          state.products.splice(deleteIndex, 1);
        }
        state.success = `Product (ID: ${action.payload}) was deleted.`;
      });
    builder
      .addCase(fetchAllProductsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.pending, (state, action) => {
        state.loading = true;
      });
    builder
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      });
  },
});

const productsReducer = productSlice.reducer;
export const { sortByPrice, clearProductError, clearProductSuccess } =
  productSlice.actions;
export default productsReducer;

import axios, { AxiosError } from "axios";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";
import { ProductState } from "../../types/Product/ProductState";
import { NewProduct } from "../../types/Product/NewProduct";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
};
const baseUrl = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("fetchAllProductsAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const addProductAsync = createAsyncThunk<
  Product,
  NewProduct,
  { rejectValue: string }
>("addProductAsync", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post(baseUrl, newProduct);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const updateProductAsync = createAsyncThunk<
  Product,
  Partial<Product>,
  { rejectValue: string }
>("updateProductAsync", async (productUpdate, { rejectWithValue }) => {
  try {
    const { id, ...updateData } = productUpdate;
    const response = await axios.put(`${baseUrl}/${id}`, updateData);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteProductAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("deleteProductAsync", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data === true ? id : 0;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const updateIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        state.products[updateIndex] = action.payload;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        if (action.payload !== 0) {
          const deleteIndex = state.products.findIndex(
            (p) => p.id === action.payload
          );
          state.products.splice(deleteIndex, 1);
        }
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
export const { sortByPrice, clearProductError } = productSlice.actions;
export default productsReducer;

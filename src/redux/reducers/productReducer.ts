import axios from "axios";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Product/Product";
import { ProductUpdate } from "../../types/Product/ProductUpdate";

const initialState: Product[] = [];
const baseUrl = "https://api.escuelajs.co/api/v1/products";

export const fetchAllProductsAsync = createAsyncThunk(
  "fetchAllProductsAsync",
  async () => {
    const response = await axios.get(baseUrl);
    const data: Product[] = response.data;
    return data;
  }
);

export const addProductAsync = createAsyncThunk(
  "addProductAsync",
  async (newProduct: Product) => {
    const response = await axios.post(baseUrl, newProduct);
    const data: Product = response.data;
    return data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "updateProductAsync",
  async (productUpdate: ProductUpdate) => {
    const { id, ...updateData } = productUpdate;
    const response = await axios.put(`${baseUrl}/${id}`, updateData);
    const data: Product = response.data;
    return data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  "deleteProductAsync",
  async (id: number) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    if (response.data === true) {
      return id;
    } else {
      return 0;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload === "asc") {
        state.sort((a, b) => a.price - b.price);
      } else {
        state.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const updateIndex = state.findIndex((p) => p.id === action.payload.id);
      state[updateIndex] = action.payload;
    });
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      if (action.payload !== 0) {
        const deleteIndex = state.findIndex((p) => p.id === action.payload);
        state.splice(deleteIndex, 1);
      }
    });
  },
});

const productReducer = productSlice.reducer;
export const { sortByPrice } = productSlice.actions;
export default productReducer;

import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User/User";
import { UserState } from "../../types/User/UserState";
import { Credentials } from "../../types/User/Credentials";
import { UserRegister } from "../../types/User/UserRegister";

const initialState: UserState = {
  users: [],
  loading: false,
  error: "",
};

const baseUrl = "https://api.escuelajs.co/api/v1";

export const fetchAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("fetchAllUsersAsync", async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${baseUrl}/users`);
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const loginUserAsync = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: string }
>("loginUserAsync", async (credentials, { rejectWithValue, dispatch }) => {
  try {
    const result = await axios.post(`${baseUrl}/auth/login`, credentials);
    const { access_token } = result.data;

    const authenticatedResult = await dispatch(
      authenticateUserAsync(access_token)
    );
    if (
      typeof authenticatedResult.payload === "string" ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || "Cannot login");
    } else {
      return authenticatedResult.payload;
    }
  } catch (e) {
    console.log("error catched");

    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const authenticateUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("authenticateUserAsync", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userProfile: User = response.data;
    return userProfile;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const registerUserAsync = createAsyncThunk<
  User,
  UserRegister,
  { rejectValue: string }
>("registerUserAsync", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, userData);
    const newUser: User = response.data;
    return newUser;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unknow error occured";
        }
      });
    builder
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unknow error occured";
        }
      });
    builder
      .addCase(authenticateUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unknow error occured";
        }
      });
    builder
      .addCase(registerUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.currentUser = action.payload;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "An unknow error occured";
        }
      });
  },
});

const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
export default userReducer;

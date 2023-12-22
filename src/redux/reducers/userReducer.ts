import axios, { AxiosError } from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User/User";
import { UserState } from "../../types/User/UserState";
import { Credentials } from "../../types/User/Credentials";
import { UserRegister } from "../../types/User/UserRegister";
import { baseUrl } from "../shared/baserUrl";

const initialState: UserState = {
  users: [],
  token: "",
  loading: false,
  error: "",
  success: "",
};

export const fetchAllUsersAsync = createAsyncThunk<
  User[],
  string,
  { rejectValue: string }
>("fetchAllUsersAsync", async (token, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const access_token = result.data;
    const authenticatedResult = await dispatch(
      authenticateUserAsync(access_token)
    );
    if (
      typeof authenticatedResult.payload === "string" ||
      !authenticatedResult.payload
    ) {
      throw Error(authenticatedResult.payload || "Cannot login");
    } else {
      localStorage.setItem("access_token", access_token);
      return authenticatedResult.payload;
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const authenticateUserAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("authenticateUserAsync", async (token, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${baseUrl}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(userSlice.actions.addToken(token));
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const registerUserAsync = createAsyncThunk<
  User,
  UserRegister,
  { rejectValue: string }
>("registerUserAsync", async (userData, { rejectWithValue, dispatch }) => {
  try {
    await axios.post(`${baseUrl}/users`, userData);
    const credentials: Credentials = {
      email: userData.email,
      password: userData.email,
    };
    const newUser = await dispatch(loginUserAsync(credentials));
    if (typeof newUser.payload === "string" || !newUser.payload) {
      throw Error("Cannot login");
    } else {
      return newUser.payload;
    }
  } catch (e) {
    const error = e as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const deleteUserAsync = createAsyncThunk<
  string,
  { id: string; token: string },
  { rejectValue: string }
>("deleteUserAsync", async ({ id, token }, { rejectWithValue }) => {
  try {
    await axios.delete(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
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
    clearUserError: (state) => {
      state.error = "";
    },
    clearUserSuccess: (state) => {
      state.success = "";
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.success = `User ${action.payload.name} login successfull`;
      })
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.success = `Welcome ${action.payload.name}!`;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        const deleteIndex = state.users.findIndex(
          (u) => u.id === action.payload
        );
        state.users.splice(deleteIndex, 1);
        state.success = `User (ID: ${action.payload}) was deleted!`;
      });
    builder
      .addCase(fetchAllUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticateUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.pending, (state, action) => {
        state.loading = true;
      });
    builder
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknow error occured";
      });
  },
});

const userReducer = userSlice.reducer;
export const { logoutUser, clearUserError, clearUserSuccess } =
  userSlice.actions;
export default userReducer;

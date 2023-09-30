import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User/User";
import { Credentials } from "../../types/User/Credentials";
import { UserRegister } from "../../types/User/UserRegister";
import { EmailAvailableRes } from "../../types/axios/EmailAvailableRes";

const initialState: User = {
  id: 0,
  email: "",
  name: "",
  role: "customer",
  avatar: "",
};

const baseUrl = "https://api.escuelajs.co/api/v1/users";

export const loginUserAsync = createAsyncThunk(
  "loginUserAsync",
  async (login: Credentials) => {
    const response = await axios.get(baseUrl);
    const data: User[] = response.data;
    const userExists = data.find(
      (u) => u.email === login.email && u.password === login.password
    );
    if (userExists) {
      const { password, ...userDetails } = userExists;
      return userDetails;
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  "registerUserAsync",
  async (userData: UserRegister) => {
    const emailAvailable: EmailAvailableRes = await axios.post(
      `${baseUrl}/is-available`,
      {
        email: userData.email,
      }
    );
    if (emailAvailable.isAvailable) {
      const newUser: User = await axios.post(baseUrl, userData);
      const { password, ...userDetails } = newUser;
      return userDetails;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

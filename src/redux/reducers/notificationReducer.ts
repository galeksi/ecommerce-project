import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NotificationProps } from "../../types/components/Notification";

const initialState: NotificationProps = {
  message: "",
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    addErrorNotification: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.error = true;
    },
    resetNotification: () => {
      return initialState;
    },
  },
});

const notificationReducer = notificationSlice.reducer;
export const { addNotification, addErrorNotification, resetNotification } =
  notificationSlice.actions;

export default notificationReducer;

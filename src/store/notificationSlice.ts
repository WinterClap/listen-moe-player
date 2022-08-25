import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationState = {
  notifications: [],
};

export type NotificationState = {
  notifications: {
    text: string;
    duration?: number;
    type?: "danger" | "warning" | "info" | "success";
    id?: string;
  }[];
};

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<NotificationState["notifications"][number] | NotificationState["notifications"]>
    ) => {
      if (Array.isArray(action.payload)) {
        const newArr = action.payload.map((payload) => {
          if (payload.type === undefined) payload.type = "success";
          if (payload.duration === undefined) payload.duration = 3000;
          return payload;
        });
        return { notifications: state.notifications.concat(newArr) };
      } else {
        if (action.payload.type === undefined) action.payload.type = "success";
        if (action.payload.duration === undefined) action.payload.duration = 3000;
        state.notifications.push(action.payload);
      }
    },
    hideNotification: (state, action: PayloadAction<string>) => {
      state.notifications.splice(
        state.notifications.findIndex((elem) => elem.id === action.payload),
        1
      );
    },
  },
});

export const { setNotification, hideNotification } = notificationSlice.actions;

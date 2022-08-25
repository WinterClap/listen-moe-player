import { playerSlice } from "./playerMoeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./notificationSlice";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

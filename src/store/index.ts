import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

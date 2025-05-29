import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import dragNodeReducer from "./dragNodeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    dragNode: dragNodeReducer,
  },
});

// 类型推导
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

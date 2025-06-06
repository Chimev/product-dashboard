import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    ui: uiReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

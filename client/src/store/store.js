import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

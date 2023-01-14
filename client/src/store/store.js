import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slice/orderSlice";
import leadReducer from "./slice/leadSlice";
import companyDetailSlice from "./slice/companyDetailSlice";
import customerPropertyReducer from "./slice/customerPropertySlice";
import complaintSlice from "./slice/complaintSlice";
import dashboardSlice from "./slice/dashboardSlice";
import auth0Slice from "./slice/auth0Slice";

const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    order: orderReducer,
    company: companyDetailSlice,
    customerProperty: customerPropertyReducer,
    lead: leadReducer,
    complaint: complaintSlice,
    auth0: auth0Slice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

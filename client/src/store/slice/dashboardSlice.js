import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios, { authHeaders } from "../../helpers/axios";

export const getDashboardDetail = createAsyncThunk(
  "getDashboardDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get("/company/dashboard");
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

export const getDashboardRewardPoints = createAsyncThunk(
  "getDashboardRewardPoints",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(
        "/projects/get/project-list/reward-points",
        authHeaders()
      );
      return response.data;
    } catch (error) {
      console.log("error", error.response);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: null,
    dashboardRewardPoints: null,
    error: null,
    loader: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getDashboardDetail.fulfilled, (state, action) => {
      state.loader = false;
      state.dashboard = action.payload;
    });
    builder.addCase(getDashboardDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(getDashboardRewardPoints.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getDashboardRewardPoints.fulfilled, (state, action) => {
      state.loader = false;
      state.dashboardRewardPoints = action.payload;
    });
    builder.addCase(getDashboardRewardPoints.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;

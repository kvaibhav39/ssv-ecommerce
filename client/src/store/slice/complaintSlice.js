import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import Axios, { authHeaders } from "../../helpers/axios";

//getComplaintDetail
export const getComplaintDetail = createAsyncThunk(
  "getComplaintDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/users/get/complaints?phone_number=${
          data?.phone_number ? data.phone_number : ""
        }&status=${data.status}&req_type=${data.req_type}&start=${
          data.start || 0
        }&limit=${data.limit || 10}`,
        authHeaders()
      );
      return {
        data: response.data,
        totalCount: response.headers["x-total-count"],
      };
    } catch (error) {
    }
  }
);


//getComplaintDetailByUserId
export const getComplaintDetailByUserId = createAsyncThunk(
  "getComplaintDetailByUserId",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/users/get/complaints?user_id=${data.userId}&req_type=${data.reqType}`,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      console.log("getComplaintDetailError", error.response);
    }
  }
);


//clearComplaint
export const clearComplaint = createAsyncThunk("clearComplaint", () => {
  return;
});
//createSlice
const complaintSlice = createSlice({
  name: "complaint",
  initialState: {
    complaintDetails: [],
    complaintDetailId: null,
    complaintDetailUserId: null,
    loader: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    // getComplaintDetail;
    builder.addCase(getComplaintDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getComplaintDetail.fulfilled, (state, action) => {
      state.complaintDetails = action.payload;
      state.loader = false;
    });
    builder.addCase(getComplaintDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });


    //getComplaintDetailByUserId
    builder.addCase(getComplaintDetailByUserId.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getComplaintDetailByUserId.fulfilled, (state, action) => {
      state.complaintDetailUserId = action.payload;
      state.loader = false;
    });
    builder.addCase(getComplaintDetailByUserId.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });


  },
});

export default complaintSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import Axios, { authHeaders } from "../../helpers/axios";

//createCompanyDetail
export const createCompanyDetail = createAsyncThunk(
  "createCompanyDetail",

  async (data, thunkAPI) => {
    try {
      const response = await Axios.post(
        "/company/add-detail",
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Company Create Successfully !", {
          autoClose: 2000,
        });
      }
      data.navigate(routes.company);
      return response.data;
    } catch (error) {
      data.cb(error);
    }
  }
);
//editCompanyDetail
export const editCompanyDetail = createAsyncThunk(
  "editCompanyDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.put(
        "/company/update/1",
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Company Detail Update Successfully !", {
          autoClose: 2000,
        });
      }
      data.navigate(routes.company);
      return response.data;
    } catch (error) {
      data.cb(error);
    }
  }
);
//getCompanyDetail
export const getCompanyDetail = createAsyncThunk(
  "getCompanyDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get("/company/get/detail");
      return response.data;
    } catch (error) {
      console.log("getCompanyError", error.response);
    }
  }
);
//createSlice
const companySlice = createSlice({
  name: "company",
  initialState: {
    createCompany: null,
    editCompany: null,
    getCompanyDetail: [],
    loader: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //getCompanyDetail
    builder.addCase(getCompanyDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getCompanyDetail.fulfilled, (state, action) => {
      state.getCompanyDetail = action.payload;
      state.loader = false;
    });
    builder.addCase(getCompanyDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //createCompanyDetail
    builder.addCase(createCompanyDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(createCompanyDetail.fulfilled, (state, action) => {
      state.createCompany = action.payload;
      state.loader = false;
    });
    builder.addCase(createCompanyDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //editCompanyDetail
    builder.addCase(editCompanyDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(editCompanyDetail.fulfilled, (state, action) => {
      state.editCompany = action.payload;
      state.loader = false;
    });
    builder.addCase(editCompanyDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});

export default companySlice.reducer;

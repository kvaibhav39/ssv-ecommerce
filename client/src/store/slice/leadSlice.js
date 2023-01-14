import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import Axios, { authHeaders } from "../../helpers/axios";

// /createLead
export const createLead = createAsyncThunk(
  "createLead",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post(
        "/projects/add-lead",
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Lead Create Successfully !", {
          autoClose: 2000,
        });
        data.navigate(`${routes.leads}/page/1`);
      }
      return response.data;
    } catch (error) {
      console.log("createLeadError", error.response);
    }
  }
);
//getLead
export const getLead = createAsyncThunk("getLead", async (data, thunkAPI) => {
  try {
    const response = await Axios.get(
      `/projects/get/leads?phone_number=${data?.phoneNumber || ""}&status=${
        data?.status || ""
      }&start=${data.start || 0}&limit=${data.limit || 10}`,
      authHeaders()
    );
    return {
      data: response.data,
      totalCount: response.headers["x-total-count"],
    };
  } catch (error) {
    console.log("err", error.response);
  }
});
export const getAllLead = createAsyncThunk(
  "getAllLead",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/projects/get/leads?phone_number=${data?.phoneNumber || ""}&status=${
          data?.status || ""
        }&start=${data.start || 0}&limit=${data.limit || 10000}`,
        authHeaders()
      );
      return {
        data: response.data,
      };
    } catch (error) {
      console.log("err", error.response);
    }
  }
);
//getLeadById
export const getLeadById = createAsyncThunk(
  "getLeadById",
  async (id, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/projects/get/lead/${id}`,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      console.log("err", error.response);
    }
  }
);
//getLeadByUserId
export const getLeadByUserId = createAsyncThunk(
  "getLeadByUserId",
  async (id, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/projects/get/user-leads/${id}`,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      console.log("err", error.response);
    }
  }
);
//clearLead
export const clearLead = createAsyncThunk("clearLead", () => {
  return;
});
//updateLeadList
export const updateLeadList = createAsyncThunk(
  "updateLeadList",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.put(
        `/projects/update/lead/${data.id}`,
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Lead Updated Successfully !", {
          autoClose: 2000,
        });
        data.navigate(`${routes.leads}/page/${data.page_number}`);
      }

      return response.data;
    } catch (error) {
      console.log("updateLeadError", error.response);
    }
  }
);
//createSlice
const leadSlice = createSlice({
  name: "lead",
  initialState: {
    createLead: null,
    lead: [],
    leads: [],
    leadId: [],
    leadUserId: [],
    loader: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
 
    //getLeadById
    builder.addCase(getLeadById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getLeadById.fulfilled, (state, action) => {
      state.leadId = action.payload;
      state.loader = false;
    });
    builder.addCase(getLeadById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //getLeadByUserId
    builder.addCase(getLeadByUserId.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getLeadByUserId.fulfilled, (state, action) => {
      state.leadUserId = action.payload;
      state.loader = false;
    });
    builder.addCase(getLeadByUserId.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });

  },
});

export default leadSlice.reducer;

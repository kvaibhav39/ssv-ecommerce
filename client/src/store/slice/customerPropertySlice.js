import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import Axios, { authHeaders } from "../../helpers/axios";
// /createCustomerProperty
export const createCustomerProperty = createAsyncThunk(
  "createCustomerProperty",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.post(
        "/users/add-property",
        data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Property created successfully !", {
          autoClose: 3000,
        });
        data.navigate(`${routes.customerProperty}/page/1`);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
//getCustomerPropertyList
export const getCustomerPropertyList = createAsyncThunk(
  "getCustomerPropertyDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/users/get/customer-property?phone_number=${
          data?.phone_number ? data?.phone_number : ""
        }&start=${data.start || 0}&limit=${data.limit || 10}`,
        authHeaders()
      );
      return {
        data: response.data,
        totalCount: response.headers["x-total-count"],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
//getCustomerPropertyById
export const getCustomerPropertyById = createAsyncThunk(
  "getCustomerPropertyById",
  async (id, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/users/get/customer-property/${id}`,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
// /getCustomerPropertyByCustomerId
export const getCustomerPropertyByCustomerId = createAsyncThunk(
  "getCustomerPropertyByCustomerId",
  async (id, thunkAPI) => {
    try {
      const response = await Axios.get(
        `/users/get/customer-property-id/${id}`,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
//updateCustomerPropertyDetail
export const updateCustomerPropertyDetail = createAsyncThunk(
  "updateCustomerPropertyDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.put(
        `/users/customer-property/update/${data.id}`,
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Property updated successfully !", {
          autoClose: 3000,
        });
        data.navigate(`${routes.customerProperty}/page/${data.page_number}`);
      }
      return response.data;
    } catch (error) {
      console.log("updateCustomerPropertyError", error.response);
    }
  }
);
//clearCustomerProperty
export const clearCustomerProperty = createAsyncThunk(
  "clearCustomerProperty",
  () => {
    return;
  }
);
//createSlice
const customerPropertySlice = createSlice({
  name: "customerProperty",
  initialState: {
    customerPropertyList: [],
    createCustomerProperty: null,
    getCustomerPropertyId: null,
    getCustomerPropertyCustomerId: null,
    updateProperty: null,
    loader: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //createCustomerProperty
    builder.addCase(createCustomerProperty.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(createCustomerProperty.fulfilled, (state, action) => {
      state.createCustomerProperty = action.payload;
      state.loader = false;
    });
    builder.addCase(createCustomerProperty.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //getCustomerPropertyDetail
    builder.addCase(getCustomerPropertyList.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getCustomerPropertyList.fulfilled, (state, action) => {
      state.customerPropertyList = action.payload;
      state.loader = false;
    });
    builder.addCase(getCustomerPropertyList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //getCustomerPropertyById
    builder.addCase(getCustomerPropertyById.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(getCustomerPropertyById.fulfilled, (state, action) => {
      state.getCustomerPropertyId = action.payload;
      state.loader = false;
    });
    builder.addCase(getCustomerPropertyById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //getCustomerPropertyByCustomerId
    builder.addCase(
      getCustomerPropertyByCustomerId.pending,
      (state, action) => {
        state.loader = true;
      }
    );
    builder.addCase(
      getCustomerPropertyByCustomerId.fulfilled,
      (state, action) => {
        state.getCustomerPropertyCustomerId = action.payload;
        state.loader = false;
      }
    );
    builder.addCase(
      getCustomerPropertyByCustomerId.rejected,
      (state, action) => {
        state.loader = false;
        state.error = action.payload;
      }
    );
    //updateCustomerPropertyDetail
    builder.addCase(updateCustomerPropertyDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(updateCustomerPropertyDetail.fulfilled, (state, action) => {
      state.updateProperty = action.payload;
      state.loader = false;
    });
    builder.addCase(updateCustomerPropertyDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });

    //clearProject
    builder.addCase(clearCustomerProperty.fulfilled, (state) => {
      state.createCustomerProperty = null;
      state.updateProperty = null;
      state.getCustomerPropertyCustomerId = null;
    });
  },
});

export default customerPropertySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import Axios, { authHeaders } from "../../helpers/axios";
//Action

//getProductList

export const getProductsList = createAsyncThunk(
  "getProductsList",
  async (data, thunkAPI) => {
    try {
      let url;
      url = `/api/products`;
      const response = await Axios.get(url, authHeaders());
      // if (data.callBack) {
      //   return data.cb(response.data);
      // }

      return {
        data: response.data.products,
        totalCount: response.headers["x-total-count"] || 0,
      };
    } catch (error) {
      data.cb(null, error);
    }
  }
);

//getOrderList
export const getOrderList = createAsyncThunk(
  "getOrderList",
  async (data, thunkAPI) => {
    try {
      let url;
      url = `/api/orders?searchField=${data || ""}`;
      const response = await Axios.get(url, authHeaders());
      // if (data.callBack) {
      //   return data.cb(response.data);
      // }
      console.log("response", response);

      return {
        data: response.data.orders,
        totalCount: response.headers["x-total-count"] || 0,
      };
    } catch (error) {
      data.cb(null, error);
    }
  }
);
//getOrderById
export const getOrderById = createAsyncThunk("getOrderById", async (data) => {
  try {
    const response = await Axios.get(
      `/api/orders/${data.orderId}`,
      authHeaders()
    );
    return response.data;
  } catch (error) {
    console.log("err", error.response);
  }
});

export const createOrderDetail = createAsyncThunk(
  "createOrderDetail",

  async (data, thunkAPI) => {
    try {
      const response = await Axios.post(
        "/api/orders",
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Company Create Successfully !", {
          autoClose: 2000,
        });
      }
      data.navigate(routes.orders);
      return response.data;
    } catch (error) {
      data.cb(error);
    }
  }
);
//updateOrderDetail
export const updateOrderDetail = createAsyncThunk(
  "updateOrderDetail",
  async (data, thunkAPI) => {
    try {
      const response = await Axios.put(
        `/api/orders/${data.orderId}`,
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        toast.success("Order Detail Update Successfully !", {
          autoClose: 2000,
        });
      }
      data.navigate(routes.orders);
      return response.data;
    } catch (error) {
      data.cb(error);
    }
  }
);

export const deleteOrderById = createAsyncThunk(
  "deleteOrderById",
  async (data, thunkAPI) => {
    console.log("data", data);
    try {
      const response = await Axios.delete(
        `/api/orders/${data.orderId}`,
        data.data,
        authHeaders()
      );
      if (response.status === 200) {
        // toast.success("Company Detail Update Successfully !", {
        //   autoClose: 2000,
        // });
        data.navigate(routes.orders);
      }

      return response.data;
    } catch (error) {
      data.cb(error);
    }
  }
);

//createSlice

const initialState = {
  orderById: null,
  orders: [],
  createOrder: null,
  updateOrder: null,
  deleteOrder: null,
  order: null,
  loader: false,
  error: "",
  products: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      return {
        ...state,
        order: null,
        deleteOrder: null,
      };
    },
  },

  extraReducers: (builder) => {
    //getOrderList
    builder.addCase(getOrderList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.loader = false;
      state.orders = action.payload.data;
    });
    builder.addCase(getOrderList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
    });
    //getProductsList
    builder.addCase(getProductsList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.loader = false;
      state.products = action.payload.data;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload.message;
    });
    //getUserListById
    builder.addCase(getOrderById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loader = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    builder.addCase(createOrderDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(createOrderDetail.fulfilled, (state, action) => {
      state.createOrder = action.payload;
      state.loader = false;
    });
    builder.addCase(createOrderDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
    //updateOrderDetail
    builder.addCase(updateOrderDetail.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(updateOrderDetail.fulfilled, (state, action) => {
      state.updateOrder = action.payload;
      state.loader = false;
    });
    builder.addCase(updateOrderDetail.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });

    builder.addCase(deleteOrderById.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(deleteOrderById.fulfilled, (state, action) => {
      state.deleteOrder = action.payload;
      state.loader = false;
    });
    builder.addCase(deleteOrderById.rejected, (state, action) => {
      state.loader = false;
      state.error = action.payload;
    });
  },
});
export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;

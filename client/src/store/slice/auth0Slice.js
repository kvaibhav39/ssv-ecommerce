import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setConnectionType = createAsyncThunk(
  "auth0/setConnectionType",
  async (type) => {
    return { payload: type };
  }
);

const companySlice = createSlice({
  name: "auth0",
  initialState: {
    connectionType: null,
  },
  reducers: {
    setConnectionType: (state, { payload }) => ({
      ...state,
      connectionType: payload,
    }),
  },
  extraReducers: {
    [setConnectionType.fulfilled]: (state, action) => {
      state.connectionType = action.payload;
    },
  },
});

export default companySlice.reducer;

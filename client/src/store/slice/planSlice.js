// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import { routes } from "../../constants";
// import Axios, { authHeaders } from "../../helpers/axios";

// //getPlan
// export const getPlan = createAsyncThunk("getPlan", async (data, thunkAPI) => {
//   try {
//     const response = await Axios.get(
//       `/projects/get/plans?project_id=${data?.projectId?.id || ""}&start=${
//         data.start || 0
//       }&limit=${data.limit || 10}`,
//       authHeaders()
//     );
//     console.log("response", response.data);
//     return {
//       data: response.data,
//       totalCount: response.headers["x-total-count"],
//     };
//   } catch (error) {
//     console.log("err", error.response);
//   }
// });
// //getPlanById
// export const getPlanById = createAsyncThunk(
//   "getPlanById",
//   async (id, thunkAPI) => {
//     try {
//       const response = await Axios.get(
//         `/projects/get/plan/${id}`,
//         authHeaders()
//       );
//       console.log("response", response.data);
//       return response.data;
//     } catch (error) {
//       console.log("err", error.response);
//     }
//   }
// );
// //createPlan
// export const createPlan = createAsyncThunk(
//   "createPlan",
//   async (data, thunkAPI) => {
//     try {
//       const response = await Axios.post(
//         "/projects/add-plan",
//         data.data,
//         authHeaders()
//       );
//       if (response.status === 200) {
//         toast.success("Plan Create Successfully !", {
//           autoClose: 2000,
//         });
//         data.navigate(`${routes.plans}/page/1`);
//       }
//       return response.data;
//     } catch (error) {
//       console.log("createPlanError", error.response);
//     }
//   }
// );
// //clearPlan
// export const clearPlan = createAsyncThunk("clearPlan", () => {
//   return;
// });
// //updatePlan
// export const updatePlan = createAsyncThunk(
//   "updatePlan",
//   async (data, thunkAPI) => {
//     try {
//       const response = await Axios.put(
//         `/projects/update/plan/${data.id}`,
//         data.data,
//         authHeaders()
//       );
//       if (response.status === 200) {
//         toast.success("Plan Updated Successfully !", {
//           autoClose: 2000,
//         });
//         data.navigate(`${routes.plans}/page/${data.page_number}`);
//       }
//       return response.data;
//     } catch (error) {
//       console.log("updatePlanError", error.response);
//     }
//   }
// );
// //createSlice
// const planSlice = createSlice({
//   name: "plan",
//   initialState: {
//     createPlan: null,
//     planDetails: [],
//     updatePlan: null,
//     planDetailId: null,
//     loader: false,
//     error: "",
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     //getPlan
//     builder.addCase(getPlan.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(getPlan.fulfilled, (state, action) => {
//       state.planDetails = action.payload;
//       state.loader = false;
//     });
//     builder.addCase(getPlan.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //getPlanById
//     builder.addCase(getPlanById.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(getPlanById.fulfilled, (state, action) => {
//       state.planDetailId = action.payload;
//       state.loader = false;
//     });
//     builder.addCase(getPlanById.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //createPlan
//     builder.addCase(createPlan.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(createPlan.fulfilled, (state, action) => {
//       state.createPlan = action.payload;
//       state.loader = false;
//     });
//     builder.addCase(createPlan.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //updatePlan
//     builder.addCase(updatePlan.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(updatePlan.fulfilled, (state, action) => {
//       state.updatePlan = action.payload;
//       state.loader = false;
//     });
//     builder.addCase(updatePlan.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //clearPlan
//     builder.addCase(clearPlan.fulfilled, (state, action) => {
//       state.planDetailId = null;
//       state.createPlan = null;
//     });
//   },
// });

// export default planSlice.reducer;

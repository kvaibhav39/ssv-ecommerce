// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import { routes } from "../../constants";
// import Axios, { authHeaders } from "../../helpers/axios";

// //createProject
// export const createProject = createAsyncThunk(
//   "createProject",

//   async (data, thunkAPI) => {
//     try {
//       const response = await Axios.post(
//         "/projects/create",
//         data.data,
//         authHeaders()
//       );
//       if (response.status === 200) {
//         toast.success("Project Create Successfully !", {
//           autoClose: 2000,
//         });
//         data.navigate(routes.projects);
//       }
//       return response.data;
//     } catch (error) {
//       console.log("error", error.response);
//     }
//   }
// );
// //getProjectList
// export const getProjectList = createAsyncThunk(
//   "getProjects",
//   async (data, thunkAPI) => {
//     try {
//       const response = await Axios.get(
//         `/projects/get/list?possession_status=&project_type=&location=&name=`
//       );
//       return response.data;
//     } catch (error) {
//       console.log("err", error.response);
//     }
//   }
// );

// //getprojectId
// export const getprojectId = createAsyncThunk("getprojectId", async (id) => {
//   try {
//     const response = await Axios.get(`/projects/get/project-detail/${id}`);

//     return response.data;
//   } catch (error) {
//     console.log("err", error.response);
//   }
// });
// //clearProject
// export const clearProject = createAsyncThunk("clearProjects", () => {
//   return;
// });
// //updateProjectList
// export const updateProjectList = createAsyncThunk(
//   "updateProjects",
//   async (data, thunkAPI) => {
//     try {
//       const response = await Axios.put(
//         `/projects/update/${data.id}`,
//         data.data,
//         authHeaders()
//       );
//       if (response.status === 200) {
//         toast.info("Project Update Successfully !", {
//           autoClose: 2000,
//         });

//         thunkAPI.dispatch(getprojectId());
//       }
//       return response.data;
//     } catch (error) {
//       console.log("updateProjectError", error.response);
//       return data.cb(error);
//     }
//   }
// );

// const projectSlice = createSlice({
//   name: "createProject",
//   initialState: {
//     createProject: null,
//     updateProject: null,
//     projects: [],
//     loader: false,
//     error: "",
//     project: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     //createProject
//     builder.addCase(createProject.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(createProject.fulfilled, (state, action) => {
//       state.loader = false;
//       state.createProject = action.payload;
//     });
//     builder.addCase(createProject.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //update project
//     builder.addCase(updateProjectList.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(updateProjectList.fulfilled, (state, action) => {
//       state.loader = false;
//       state.updateProject = action.payload;
//     });
//     builder.addCase(updateProjectList.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //getProjectList
//     builder.addCase(getProjectList.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(getProjectList.fulfilled, (state, action) => {
//       state.loader = false;
//       state.projects = action.payload;
//     });
//     builder.addCase(getProjectList.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //getprojectId
//     builder.addCase(getprojectId.pending, (state) => {
//       state.loader = true;
//     });
//     builder.addCase(getprojectId.fulfilled, (state, action) => {
//       state.loader = false;
//       state.project = action.payload;
//     });
//     builder.addCase(getprojectId.rejected, (state, action) => {
//       state.loader = false;
//       state.error = action.payload;
//     });
//     //clearProject
//     builder.addCase(clearProject.fulfilled, (state, action) => {
//       state.project = null;
//       state.createProject = null;
//     });
//   },
// });
// // export const { clearProject } = projectSlice.actions;
// export default projectSlice.reducer;

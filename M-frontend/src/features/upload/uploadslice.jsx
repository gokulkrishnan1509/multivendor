import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadImage from "./uploadservice";

export const uploadUserImage = createAsyncThunk(
  "user/upload",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();

      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }

      const response = await uploadImage.userUploadImg(formData);
      return response.image;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  userImage:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const imageSlice = createSlice({
  name: "images",
  initialState:initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadUserImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadUserImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userImage = action.payload;
      })
      .addCase(uploadUserImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default imageSlice.reducer;

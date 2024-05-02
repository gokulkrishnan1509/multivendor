import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import sellerService from "./sellerService";
import { toast } from "react-toastify";
export const resetState = createAction("Reset_all");

export const sellerRegistrationOnServer = createAsyncThunk(
  "shop/register/create",
  async (data, thunkAPI) => {
    try {
      const response = await sellerService.sellerRegistration(data);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(resetState()); // Dispatch resetState action
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activateShopOnServer = createAsyncThunk(
  "shop/activate",
  async (data, thunkAPI) => {
    try {
      const response = await sellerService.sellerActivation(data);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(resetState()); // Dispatch resetState action
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loadSellerOnServer = createAsyncThunk(
  "shop/load",
  async (_, thunkAPI) => {
    try {
      const response = await sellerService.loadSeller();
      return response.user;
    } catch (error) {
      thunkAPI.dispatch(resetState()); // Dispatch resetState action

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginSellerOnServer = createAsyncThunk(
  "shop/login",
  async (data, thunkAPI) => {
    try {
      const response = await sellerService.sellerLogin(data);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      thunkAPI.dispatch(resetState()); // Dispatch resetState action

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllShopfromServer = createAsyncThunk(
  "shop/get",
  async (_, thunkAPI) => {
    try {
      const response = await sellerService.getAllShop();
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // shopAuthendicate:{}
};

export const shopAuth = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerRegistrationOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellerRegistrationOnServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createUser = action.payload;
        if (state.createUser) {
          toast.success(state.createUser?.message);
        }
      })
      .addCase(sellerRegistrationOnServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(activateShopOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateShopOnServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(activateShopOnServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(loadSellerOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSellerOnServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSeller = true;
        state.shopAuthendicate = action.payload;
      })
      .addCase(loadSellerOnServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(loginSellerOnServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginSellerOnServer.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.ShopLogin = action.payload;
      })
      .addCase(loginSellerOnServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getAllShopfromServer.pending,(state)=>{
        state.isLoading=true
      }).addCase(getAllShopfromServer.fulfilled,(state,action)=>{
        state.isSuccess=true;
        state.isLoading=false;
        state.isError=false;
        state.shops =action.payload
      }).addCase(getAllShopfromServer.rejected,(state,action)=>{
        state.isError=true;
        state.isLoading=false;
        state.isSuccess=false;
        state.message=action.error
      })
      .addCase(resetState, () => initialState);
  },
});

export default shopAuth.reducer;

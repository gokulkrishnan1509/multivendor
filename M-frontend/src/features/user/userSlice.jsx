import {
  createSlice,
  createAsyncThunk,
  createAction,
  createReducer,
} from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
export const resetState = createAction("Reset_all");

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.register(userData);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activateNewUser = createAsyncThunk(
  "auth/activate",
  async (userToken, thunkAPI) => {
    try {
      const response = await userService.activationToken(userToken);
      return response;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginNewUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await userService.userLogin(data);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const isAunthundicatedUser = createAsyncThunk(
  "auth/isAuth",
  async (_, thunkAPI) => {
    try {
      const response = await userService.authandicateUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const LogoutUser = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    const response = await userService.userLogOut();
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);

    return thunkAPI.rejectWithValue(error);
  }
});

export const UpdateUserInformation = createAsyncThunk(
  "auth/updateuser",
  async (data, thunkAPI) => {
    try {
      const response = await userService.updateUserInformation(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetLoginUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "auth/updateUserAddress",
  async (data, thunkAPI) => {
    try {
      const response = await userService.updateUSerAddressRequest(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "auth/delteUserAddress",
  async (data, thunkAPI) => {
    try {
      const response = await userService.userDeleteAddressRequest(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, thunkAPI) => {
    try {
      const response = await userService.updatePassword(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllUserfromServer = createAsyncThunk(
  "/get-all-user",
  async (_, thunkAPI) => {
    try {
      const response = await userService.getAllUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action?.payload?.success;
        state.createUser = action.payload;
        if (state.isSuccess) {
          toast.success(state.createUser?.message);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(activateNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userToken = action.payload;
      })
      .addCase(activateNewUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
        // console.log(state.message)
        // if(state.message){
        //   toast.error(state.message.message)
        // }
      })
      .addCase(loginNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = action?.payload?.success;
        state.userLogin = action.payload;
        if (state.isSuccess) {
          toast.success("Success");
        }
      })
      .addCase(loginNewUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;

        // console.log(action.payload.response.data.message)
      })
      .addCase(isAunthundicatedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isAunthundicatedUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userAuthorized = action?.payload?.success;
      })
      .addCase(isAunthundicatedUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
        state.isSuccess = true;
      })
      .addCase(LogoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.logout = action.payload;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(UpdateUserInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUserInformation.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userPatch = action.payload;
      })
      .addCase(UpdateUserInformation.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(GetLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetLoginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(GetLoginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
        state.isSuccess = false;
      })
      .addCase(deleteUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error;
        state.isSuccess = false;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getAllUserfromServer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserfromServer.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.getAllUser = action.payload;
      })
      .addCase(getAllUserfromServer.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
      })

      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;

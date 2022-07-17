import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import authService from "../services/auth.service";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const result = await authService.register(user);

      return "Пользователь успешно зарегистрирован";
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      (error.response && error.response.data && error.response.data.detail) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const tokenUpdate = createAsyncThunk(
  "auth/tokenUpdate",
  async (token, thunkAPI) => {
    const userUpdated = await authService.updateAccessToken(token);
    return { user: userUpdated };
  }
);

export const addUser = createAsyncThunk("auth/addUser", async () => {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = jsonValue != null ? JSON.parse(jsonValue) : null;
  if (user) {
    const decodedJwt = jwt_decode(user.refresh);
    if (decodedJwt.exp * 1000 < Date.now()) {
      await AsyncStorage.removeItem("user");
      return null;
    }
  }
  return user;
});

export const addMessage = createAsyncThunk(
  "auth/addMessage",
  (data, thunkApi) => {
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.fulfilled, (state, action) => {
        state.message = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(addUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(tokenUpdate.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(tokenUpdate.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset, clearMessage } = authSlice.actions;
export default authSlice.reducer;

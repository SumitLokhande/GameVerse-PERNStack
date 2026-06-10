import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Define a type for the slice state
interface CounterState {
  value: number;
  loginAccess: boolean;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
  loginAccess: false,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

interface loginUserInfo {
  username: string;
  password: string;
}
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: loginUserInfo, { rejectWithValue }) => {
    try {
      // const response = await makeApiRequest("POST", "/login", credentials);
      const response = await axios.post("/login", credentials);
      return response.data.token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserInfo: (state) => {
      state.loginAccess = true;
    },
    setUserInfo: (state) => {
      state.loginAccess = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    resetPassword: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        toast("User Logged In!");
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast(state.error);
      });
  },
});

export const { getUserInfo, setUserInfo, resetPassword, clearToken } =
  userSlice.actions;

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./../../axiosAPI";

export const registration = createAsyncThunk(
  "auth-registration",
  async (params) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);

export const login = createAsyncThunk("auth-login", async (params) => {
  const { data } = await axios.post("/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("fetchAuthMe", async () => {
  const { data } = await axios.get("/me");
  return data;
});

const initialState = {
  userEmail: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.pending, (state) => {
        state.userEmail = null;
        state.status = "loading";
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.userEmail = action.payload.email;
        state.status = "loaded";
      })
      .addCase(registration.rejected, (state) => {
        state.userEmail = null;
        state.status = "error";
      })
      .addCase(login.pending, (state) => {
        state.userEmail = null;
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userEmail = action.payload.email;
        state.status = "loaded";
      })
      .addCase(login.rejected, (state) => {
        state.userEmail = null;
        state.status = "error";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.userEmail = null;
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.userEmail = action.payload.email;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.userEmail = null;
        state.status = "error";
      });
  },
});

export const isAuthSelector = (state) => Boolean(state.auth.userEmail);
export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
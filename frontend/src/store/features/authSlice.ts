import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

type User = {
  username: string;
  password: string;
};

type Refresh = {
  refresh: string;
};

type NewUser = User & {
  name: string;
};

interface IJWTDecode {
  user_id: string;
  token_type: string;
  exp: string;
  username: string;
}

type TokenInfo = {
  refresh: string;
  access: string;
};

type UserProfileData = {
  username: string;
};

type AuthApiState = {
  tokenInfo?: TokenInfo | null;
  userProfileData?: UserProfileData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  tokenInfo: localStorage.getItem("tokenInfo")
    ? JSON.parse(localStorage.getItem("tokenInfo") as string)
    : null,
  userProfileData: localStorage.getItem("tokenInfo")
    ? {
        username: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).username,
      }
    : null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post("/token/", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const refresh = createAsyncThunk("refresh", async (data: Refresh) => {
  const response = await axiosInstance.post("/token/refresh/", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const register = createAsyncThunk("register", async (data: NewUser) => {
  const response = await axiosInstance.post("/register", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const logout = createAsyncThunk("logout", async () => {
  localStorage.removeItem("tokenInfo");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<TokenInfo>) => {
        state.status = "idle";
        state.tokenInfo = {
          refresh: action.payload.refresh,
          access: action.payload.access,
        };
        state.userProfileData = {
          username: jwtDecode<IJWTDecode>(state.tokenInfo.access).username,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<TokenInfo>) => {
        state.status = "idle";
        state.tokenInfo = {
          refresh: action.payload.refresh,
          access: action.payload.access,
        };
        state.userProfileData = {
          username: jwtDecode<IJWTDecode>(state.tokenInfo.access).username,
        };
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
        logout();
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<TokenInfo>) => {
          state.status = "idle";
          state.tokenInfo = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.tokenInfo = null;
        state.userProfileData = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      });
  },
});

export default authSlice.reducer;

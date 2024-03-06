import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";

type User = {
  email: string;
  password: string;
};

type Refresh = {
  refresh: string;
  access: string;
};

type NewUser = User & {
  name: string;
};

interface IJWTDecode {
  user_id: number;
  token_type: string;
  exp: string;
  name: string;
  superuser: boolean;
  staff: boolean;
}

type TokenInfo = {
  refresh: string;
  access: string;
};

type UserProfileData = {
  name: string;
  user_id: number;
  superuser: boolean;
  staff: boolean;
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
        name: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).name,
        user_id: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).user_id,
        superuser: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).superuser,
        staff: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).staff,
      }
    : null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post("/token/", data);
  const resData = response.data;
  console.log(resData);
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
          user_id: jwtDecode<IJWTDecode>(state.tokenInfo.access).user_id,
          name: jwtDecode<IJWTDecode>(state.tokenInfo.access).name,
          superuser: jwtDecode<IJWTDecode>(state.tokenInfo.access).superuser,
          staff: jwtDecode<IJWTDecode>(state.tokenInfo.access).staff,
        };
        console.log(state.userProfileData);
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
          user_id: jwtDecode<IJWTDecode>(state.tokenInfo.access).user_id,
          name: jwtDecode<IJWTDecode>(state.tokenInfo.access).name,
          superuser: jwtDecode<IJWTDecode>(state.tokenInfo.access).superuser,
          staff: jwtDecode<IJWTDecode>(state.tokenInfo.access).staff,
        };
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
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

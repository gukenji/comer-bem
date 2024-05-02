import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import {
  IJWTDecode,
  ITokenInfo,
  IUserData,
  IUserLogin,
} from "../../interfaces/AuthInterfaces";

interface IRefresh {
  refresh: string;
  access: string;
}

interface IAuthApiState {
  tokenInfo: ITokenInfo | null;
  userProfileData: IUserData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: IAuthApiState & { tab: null | number } = {
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
        height: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).height,
        weight: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).weight,
        age: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).age,
        is_male: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).is_male,
        gcd: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).gcd,
        profile_pic: jwtDecode<IJWTDecode>(
          JSON.parse(localStorage.getItem("tokenInfo") as string).access
        ).profile_pic,
      }
    : null,
  status: "idle",
  error: null,
  tab: null,
};

export const login = createAsyncThunk("login", async (data: IUserLogin) => {
  const response = await axiosInstance.post("/token/", data);
  const resData = response.data;
  localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

export const getUser = createAsyncThunk(
  "get_user",
  async (data: { email: string }) => {
    const response = await axiosInstance.get(`/user/get/${data.email}/`);
    const resData = response.data;
    return resData;
  }
);

export const refresh = createAsyncThunk("refresh", async (data: IRefresh) => {
  const response = await axiosInstance.post("/token/refresh/", data);
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
  reducers: {
    selectTab(state, action: PayloadAction<number | null>) {
      state.tab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ITokenInfo>) => {
        state.status = "idle";
        state.tab = 0;
        state.tokenInfo = {
          refresh: action.payload.refresh,
          access: action.payload.access,
        };
        state.userProfileData = {
          user_id: jwtDecode<IJWTDecode>(state.tokenInfo.access).user_id,
          name: jwtDecode<IJWTDecode>(state.tokenInfo.access).name,
          superuser: jwtDecode<IJWTDecode>(state.tokenInfo.access).superuser,
          staff: jwtDecode<IJWTDecode>(state.tokenInfo.access).staff,
          height: jwtDecode<IJWTDecode>(state.tokenInfo.access).height,
          weight: jwtDecode<IJWTDecode>(state.tokenInfo.access).weight,
          age: jwtDecode<IJWTDecode>(state.tokenInfo.access).age,
          is_male: jwtDecode<IJWTDecode>(state.tokenInfo.access).is_male,
          gcd: jwtDecode<IJWTDecode>(state.tokenInfo.access).gcd,
          profile_pic: jwtDecode<IJWTDecode>(state.tokenInfo.access)
            .profile_pic,
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
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<ITokenInfo>) => {
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
            height: jwtDecode<IJWTDecode>(state.tokenInfo.access).height,
            weight: jwtDecode<IJWTDecode>(state.tokenInfo.access).weight,
            age: jwtDecode<IJWTDecode>(state.tokenInfo.access).age,
            is_male: jwtDecode<IJWTDecode>(state.tokenInfo.access).is_male,
            gcd: jwtDecode<IJWTDecode>(state.tokenInfo.access).gcd,
            profile_pic: jwtDecode<IJWTDecode>(state.tokenInfo.access)
              .profile_pic,
          };
        }
      )
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.tab = null;
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
export const { selectTab } = authSlice.actions;

export default authSlice.reducer;

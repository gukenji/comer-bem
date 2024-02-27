import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;

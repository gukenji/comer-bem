import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRegisterFirstStep,
  IRegisterSecondStep,
} from "../../interfaces/RegisterInterfaces";
import axiosInstance from "../../api/axiosInstance";
import { RootState } from "../store";

const initialState: IRegisterFirstStep &
  IRegisterSecondStep & { step: number } = {
  step: 1,
  email: null,
  password: null,
  password_confirmation: null,
  name: null,
  height: null,
  weight: null,
  age: null,
  is_male: null,
};

export const registerUser = createAsyncThunk("register", async (args, api) => {
  const state = api.getState() as RootState;
  const data = {
    email: state.register.email,
    password: state.register.password,
    password_confirmation: state.register.password_confirmation,
    name: state.register.name,
    height: state.register.height,
    weight: state.register.weight,
    age: state.register.age,
    is_male: state.register.is_male,
  };
  const response = await axiosInstance.post("/user/register/", data);
  const resData = response.data;
  // localStorage.setItem("tokenInfo", JSON.stringify(resData));
  return resData;
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setFirstStep(state, action: PayloadAction<IRegisterFirstStep>) {
      state.step = 2;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.password_confirmation = action.payload.password_confirmation;
    },
    setSecondStep(state, action: PayloadAction<IRegisterSecondStep>) {
      state.height = action.payload.height;
      state.name = action.payload.name;
      state.weight = action.payload.weight;
      state.age = action.payload.age;
      state.is_male = action.payload.is_male;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        state.step = 1;
      })
      .addCase(registerUser.rejected, (state, action) => {});
  },
});
export const { setFirstStep, setSecondStep } = registerSlice.actions;
export default registerSlice.reducer;

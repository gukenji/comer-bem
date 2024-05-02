import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IRegisterFirstStep,
  IRegisterSecondStep,
} from "../../interfaces/RegisterInterfaces";
import axiosInstance from "../../api/axiosInstance";
import { RootState } from "../store";
import axios from "axios";

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
  profile_pic: null,
};

export const getCharacter = createAsyncThunk("get_character", async () => {
  const response = await axiosInstance.get("/character/get/");
  const resData = response.data;
  return resData;
});

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacter.pending, (state) => {})
      .addCase(getCharacter.fulfilled, (state, action) => {})
      .addCase(getCharacter.rejected, (state, action) => {});
  },
});

export const {} = characterSlice.actions;
export default characterSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

interface IMeals {
  id?: number | null;
  body?: string | null;
  user?: number | null;
}

interface IMealsList {
  meal_list: IMeals[] | null;
  error: string | null;
}

const initialState: IMealsList = {
  meal_list: null,
  error: null,
};

export const getMeals = createAsyncThunk("meals", async () => {
  const response = await axiosInstance.get("/meals/");
  const resData = response.data;
  return resData;
});

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeals.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(getMeals.fulfilled, (state, action: PayloadAction<IMeals[]>) => {
        state.meal_list = action.payload;
        state.error = null;
      })
      .addCase(getMeals.rejected, (state, action) => {
        state.meal_list = null;
        state.error = "falha ao recuperar refeições ";
      });
  },
});

export default mealsSlice.reducer;

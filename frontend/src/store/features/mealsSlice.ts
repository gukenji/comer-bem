import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

interface IMeals {
  id?: number | null;
  body?: string | null;
  user?: number | null;
}

interface IMealsList {
  meal_list: IMeals[] | null;
}

const initialState: IMealsList = {
  meal_list: null,
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
      .addCase(getMeals.pending, (state) => {})
      .addCase(getMeals.fulfilled, (state, action: PayloadAction<IMeals[]>) => {
        state.meal_list = action.payload;
      })
      .addCase(getMeals.rejected, (state, action) => {});
  },
});

export default mealsSlice.reducer;

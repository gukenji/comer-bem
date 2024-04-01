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

const initialState: IMealsList & { open_icon: boolean; icon: string | null } = {
  meal_list: null,
  error: null,
  open_icon: false,
  icon: null,
};

export const getMeals = createAsyncThunk("meals", async () => {
  const response = await axiosInstance.get("/meals/");
  const resData = response.data;
  return resData;
});

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setOpenIcon(state) {
      state.open_icon = !state.open_icon;
    },
    selectIcon(state, action) {
      state.icon = action.payload;
    },
  },
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

export const { setOpenIcon, selectIcon } = mealsSlice.actions;

export default mealsSlice.reducer;

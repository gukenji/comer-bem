import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

interface IFood {
  id?: number | null;
  brand?: string | null;
  name?: string | null;
  portion_size: number | null;
  is_custom_portion: boolean | null;
  portion_description: string | null;
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  user: number | null;
}
interface IFoodList {
  food_list: IFood[] | null;
  error: string | null;
}

const initialState: IFoodList = {
  food_list: null,
  error: null,
};

export const getFoods = createAsyncThunk("foods", async () => {
  const response = await axiosInstance.get("/foods/");
  const resData = response.data;
  return resData;
});

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFoods.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(getFoods.fulfilled, (state, action: PayloadAction<IFood[]>) => {
        state.food_list = action.payload;
        state.error = null;
      })
      .addCase(getFoods.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições ";
      });
  },
});

export default foodsSlice.reducer;

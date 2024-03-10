import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { IFood, IFoodList } from "../../interfaces/FoodInterfaces";

const initialState: IFoodList = {
  food_list: null,
  error: null,
};

export const createFood = createAsyncThunk(
  "create_food",
  async (data: IFood) => {
    console.log(data);
    const response = await axiosInstance.post("/foods/create/", data);
    console.log(response);
    const resData = response.data;
    return resData;
  }
);

export const getFoods = createAsyncThunk("get_food", async () => {
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
      })
      .addCase(createFood.pending, (state) => {})
      .addCase(
        createFood.fulfilled,
        (state, action: PayloadAction<IFood[]>) => {
          console.log(state);
        }
      )
      .addCase(createFood.rejected, (state, action) => {});
  },
});

export default foodsSlice.reducer;

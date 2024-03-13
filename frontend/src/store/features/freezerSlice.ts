import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import {
  IFetchFreezer,
  IGetFreezer,
  IIncludeToFreezer,
  IInputQuantity,
} from "../../interfaces/FreezerInterfaces";
import { IGetFood } from "../../interfaces/FoodInterfaces";

const initialState: IGetFreezer & IInputQuantity = {
  food: null,
  value: "",
  food_list: null,
  error: null,
};

export const getFreezer = createAsyncThunk("get_my_freezer", async () => {
  const response = await axiosInstance.get("/my_freezer/get/");
  const resData = response.data;
  return resData;
});

export const includeToFreezer = createAsyncThunk(
  "include_to_freezer",
  async (data: IIncludeToFreezer) => {
    const response = await axiosInstance.post("/my_freezer/include/", data);
    const resData = response.data;
    return resData;
  }
);

const freezerSlice = createSlice({
  name: "freezer",
  initialState,
  reducers: {
    selectQuantity(state, action: PayloadAction<number | string>) {
      state.value = action.payload;
    },
    selectFood(state, action: PayloadAction<IGetFood | null>) {
      state.food = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFreezer.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(
        getFreezer.fulfilled,
        (state, action: PayloadAction<IFetchFreezer[]>) => {
          state.food_list = action.payload;
          state.error = null;
        }
      )
      .addCase(getFreezer.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições ";
      })
      .addCase(includeToFreezer.pending, (state) => {})
      .addCase(
        includeToFreezer.fulfilled,
        (state, action: PayloadAction<IIncludeToFreezer[]>) => {}
      )
      .addCase(includeToFreezer.rejected, (state, action) => {});
  },
});
export const { selectQuantity, selectFood } = freezerSlice.actions;

export default freezerSlice.reducer;

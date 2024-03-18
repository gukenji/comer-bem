import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import {
  IFetchInventory,
  IGetInventory,
  IIncludeToInventory,
  IInputQuantity,
} from "../../interfaces/InventoryInterfaces";
import { IGetFood } from "../../interfaces/FoodInterfaces";

const initialState: IGetInventory &
  IInputQuantity & { success: boolean | null } = {
  food: null,
  value: "",
  food_list: null,
  error: null,
  refreshed: false,
  success: null,
};

export const getInventory = createAsyncThunk("get_my_freezer", async () => {
  const response = await axiosInstance.get("/inventory/get/");
  const resData = response.data;
  return resData;
});

export const includeToInventory = createAsyncThunk(
  "include_to_inventory",
  async (data: IIncludeToInventory) => {
    const response = await axiosInstance.post("/inventory/include/", data);
    const resData = response.data;
    return resData;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    selectQuantity(state, action: PayloadAction<number | string>) {
      state.value = action.payload;
    },
    selectFood(state, action: PayloadAction<IGetFood | null>) {
      state.food = action.payload;
    },
    eraseSucessAlert(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInventory.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(
        getInventory.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.food_list = action.payload;
          state.error = null;
          state.refreshed = true;
        }
      )
      .addCase(getInventory.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições ";
      })
      .addCase(includeToInventory.pending, (state) => {})
      .addCase(
        includeToInventory.fulfilled,
        (state, action: PayloadAction<IFetchInventory[]>) => {
          state.refreshed = false;
          state.success = true;
        }
      )
      .addCase(includeToInventory.rejected, (state, action) => {
        state.success = false;
      });
  },
});
export const { selectQuantity, selectFood, eraseSucessAlert } =
  inventorySlice.actions;

export default inventorySlice.reducer;

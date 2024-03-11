import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { IFreezer, IFreezerList } from "../../interfaces/FreezerInterfaces";

const initialState: IFreezerList = {
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
  async (data: IFreezer) => {
    console.log(data);
    const response = await axiosInstance.post("/my_freezer/include/", data);
    const resData = response.data;
    return resData;
  }
);

const freezerSlice = createSlice({
  name: "freezer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFreezer.pending, (state) => {
        state.error = "carregando...";
      })
      .addCase(
        getFreezer.fulfilled,
        (state, action: PayloadAction<IFreezer[]>) => {
          state.food_list = action.payload;
          state.error = null;
        }
      )
      .addCase(getFreezer.rejected, (state, action) => {
        state.food_list = null;
        state.error = "falha ao recuperar refeições ";
      });
  },
});

export default freezerSlice.reducer;

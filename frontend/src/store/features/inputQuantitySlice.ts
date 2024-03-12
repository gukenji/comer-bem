import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IInputQuantity {
  value: number | string;
}

const initialState = { value: "" } satisfies IInputQuantity as IInputQuantity;

const inputQuantitySlice = createSlice({
  name: "inputQuantity",
  initialState,
  reducers: {
    change(state, action: PayloadAction<number | string>) {
      state.value = action.payload;
    },
  },
});

export const { change } = inputQuantitySlice.actions;
export default inputQuantitySlice.reducer;

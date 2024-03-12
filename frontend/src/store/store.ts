import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import authSlice from "./features/authSlice";
import mealsSlice from "./features/mealsSlice";
import foodsSlice from "./features/foodsSlice";
import freezerSlice from "./features/freezerSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    meals: mealsSlice,
    foods: foodsSlice,
    freezer: freezerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from "@reduxjs/toolkit";
import { PersonSlice } from "./features/personSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AuthSlice } from "./features/authSlice";

export const store = configureStore({
  reducer: {
    person: PersonSlice.reducer,
    auth: AuthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

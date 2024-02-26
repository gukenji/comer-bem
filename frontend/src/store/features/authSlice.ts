import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Person {
  id: number;
  name: string;
}

interface PersonState {
  persons: Person[];
}

const initialState: PersonState = {
  persons: [],
};

export const AuthSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<{ name: string }>) => {
      state.persons.push({
        id: state.persons.length,
        name: action.payload.name,
      });
    },
  },
});

export default AuthSlice.reducer;
export const { addPerson } = AuthSlice.actions;

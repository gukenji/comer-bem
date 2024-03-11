import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import { useEffect } from "react";
import { IFood, IGetFood } from "../interfaces/FoodInterfaces";
export default function IncludeToFreezer() {
  const [value, setValue] = React.useState<IGetFood | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const foods = useAppSelector((state) => state.foods.food_list);
  const dispatch = useAppDispatch();
  const fetchFoods = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      <div>{`value: ${value !== null ? `'${value.id}'` : "null"}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        filterSelectedOptions
        onChange={(event, newValue: IGetFood | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={foods as IGetFood[]}
        getOptionLabel={(option) => (option as { name: string }).name}
        renderOption={(props, option) => <li {...props}>{option?.name}</li>}
        renderInput={(params) => (
          <TextField {...params} variant="standard" label="BUSCAR ALIMENTO" />
        )}
      />
    </div>
  );
}

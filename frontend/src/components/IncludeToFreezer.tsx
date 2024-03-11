import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import { useEffect } from "react";
import { IFood, IGetFood } from "../interfaces/FoodInterfaces";
import { Box, Divider, Typography } from "@mui/material";
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
  }, [foods]);

  return (
    <Box sx={{ p: 1 }}>
      <div>
        <div>{`value: ${value !== null ? `'${value.id}'` : null}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>

        <br />
        <Autocomplete
          value={value}
          filterSelectedOptions
          noOptionsText={
            <Typography
              component={"span"}
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            >
              ALIMENTO NÃO ENCONTRADO
            </Typography>
          }
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
          renderOption={(props, option) => (
            <div key={option.id}>
              <li
                {...props}
                style={{
                  fontFamily: "VT323",
                  fontSize: 20,
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {option?.name}
              </li>
              <Divider />
            </div>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="BUSCAR ALIMENTO"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
            />
          )}
        />
      </div>
    </Box>
  );
}

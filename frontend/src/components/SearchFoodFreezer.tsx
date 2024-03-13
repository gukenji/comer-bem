import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import { useEffect, useRef } from "react";
import { IGetFood } from "../interfaces/FoodInterfaces";
import { Box, Divider, Typography } from "@mui/material";
import { selectFood } from "../store/features/freezerSlice";
const SearchFoodFreezer = () => {
  const [inputValue, setInputValue] = useState("");
  const isRefreshed = useAppSelector((state) => state.foods.refreshed);
  const foods = useAppSelector((state) => state.foods.food_list);
  const food = useAppSelector((state) => state.freezer.food);
  const dispatch = useAppDispatch();

  const fetchFoods = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    !isRefreshed ? fetchFoods() : null;
  }, [isRefreshed]);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Autocomplete
          value={food}
          filterSelectedOptions
          noOptionsText={
            <Typography
              component={"span"}
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            >
              ALIMENTO NÃO ENCONTRADO
            </Typography>
          }
          onChange={(event, newFood: IGetFood | null) => {
            dispatch(selectFood(newFood));
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
      </Box>
    </>
  );
};

export default SearchFoodFreezer;

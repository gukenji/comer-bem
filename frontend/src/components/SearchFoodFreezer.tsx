import { useAppDispatch, useAppSelector } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import { useEffect } from "react";
import { getFreezer } from "../store/features/freezerSlice";
import { IGetFood } from "../interfaces/FoodInterfaces";
import {
  Box,
  Divider,
  Typography,
  TextField,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import { eraseSucessAlert, selectFood } from "../store/features/freezerSlice";
import { useState } from "react";
import { IFetchFreezer } from "../interfaces/FreezerInterfaces";

const SearchFoodFreezer = () => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const isRefreshed = useAppSelector((state) => state.foods.refreshed);
  const foods = useAppSelector((state) => state.foods.food_list);
  const food = useAppSelector((state) => state.freezer.food);
  const my_freezer = useAppSelector((state) => state.freezer.food_list);
  const isFreezerRefreshed = useAppSelector((state) => state.freezer.refreshed);
  const [foodExist, setFoodExist] = useState(false);

  const checkIfFoodExist = (key: number) => {
    const result = (my_freezer as IFetchFreezer[]).some(
      (item) => item.food.id === key
    );
    setFoodExist(result);
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        await dispatch(getFoods()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isRefreshed ? fetchFoods() : null;
  }, [isRefreshed, dispatch]);

  useEffect(() => {
    const fetchFreezer = async () => {
      try {
        await dispatch(getFreezer()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isFreezerRefreshed ? fetchFreezer() : null;
  }, [!isFreezerRefreshed, dispatch]);

  const helperText = (
    <Box>
      <FormHelperText
        id="standard-weight-helper-text"
        sx={{ color: "red", fontFamily: "VT323", fontSize: 12 }}
      >
        ALIMENTO JÁ CADASTRADO EM SEU INVENTÁRIO.
      </FormHelperText>
      <FormHelperText
        id="standard-weight-helper-text"
        sx={{ color: "red", fontFamily: "VT323", fontSize: 12 }}
      >
        CADASTRA-LO NOVAMENTE SOMARA À QUANTIDADE EXISTENTE.
      </FormHelperText>
    </Box>
  );

  useEffect(() => {
    food ? checkIfFoodExist(food.id) : setFoodExist(false);
  }, [food]);

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
              onClick={() => dispatch(eraseSucessAlert())}
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
            />
          )}
        />
        {foodExist ? helperText : <></>}
      </Box>
    </>
  );
};

export default SearchFoodFreezer;

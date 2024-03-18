import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  eraseSucessAlert,
  includeToInventory,
} from "../store/features/inventorySlice";
import { IIncludeToInventory } from "../interfaces/InventoryInterfaces";
import { IGetFood } from "../interfaces/FoodInterfaces";
import {
  selectFood,
  selectQuantity,
  updateInventory,
} from "../store/features/inventorySlice";
import {
  Box,
  CardActions,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormHelperText,
  Card,
  Paper,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";

const IncludeToInventory = () => {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) => state.inventory.value);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const success = useAppSelector((state) => state.inventory.success);
  const selected_food = useAppSelector((state) => state.inventory.food);
  const [foodExist, setFoodExist] = useState(false);
  const my_inventory = useAppSelector((state) => state.inventory.food_list);

  const checkIfFoodExist = (key: number) => {
    const result = (my_inventory as IFetchInventory[]).some(
      (item) => item.food.id === key
    );
    setFoodExist(result);
  };

  const getFoodAtInventory = (key: number) => {
    const inventory = my_inventory?.find((x) => x.food.id === key);
    return inventory;
  };

  useEffect(() => {
    selected_food ? checkIfFoodExist(selected_food.id) : setFoodExist(false);
  }, [selected_food]);

  const handleQuantityInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      dispatch(selectQuantity(value));
    } else {
      dispatch(selectQuantity(""));
    }
  };

  const clearForm = () => {
    dispatch(selectQuantity(""));
    dispatch(selectFood(null));
  };

  const updateToInventory = async () => {
    try {
      const inventory = getFoodAtInventory((selected_food as IGetFood).id);
      const inventory_json = JSON.parse(JSON.stringify(inventory));
      const updated_inventory = {
        user: userProfileInfo?.user_id as number,
        food: selected_food?.id as number,
        quantity: inventory_json?.quantity + quantity,
        id: inventory_json?.id,
      };
      await dispatch(updateInventory(updated_inventory)).unwrap();
      clearForm();
    } catch (e) {
      console.log(e);
    }
  };
  const addToInventory = async () => {
    try {
      const new_food: IIncludeToInventory = {
        user: userProfileInfo?.user_id,
        food: selected_food?.id as number,
        quantity: quantity as number,
      };
      await dispatch(includeToInventory(new_food)).unwrap();
      clearForm();
    } catch (e) {
      console.log(e);
    }
  };
  const handleIncludeToInventory = async () => {
    {
      foodExist ? updateToInventory() : addToInventory();
    }
  };

  const calculateMacros = (input_quantity: number, food: IGetFood | null) => {
    const carbs: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.carbs}`
      : `0`;
    const fat: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.fat}`
      : `0`;
    const protein: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.protein}`
      : `0`;
    const kcal: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.kcal}`
      : `0`;
    const macros = {
      carbs: parseFloat(carbs).toFixed(2),
      fat: parseFloat(fat).toFixed(2),
      protein: parseFloat(protein).toFixed(2),
      kcal: parseFloat(kcal).toFixed(2),
    };
    return macros;
  };
  return (
    <Card
      sx={{
        display: selected_food ? "inherit" : "none",
        border: "none",
        boxShadow: "none",
      }}
    >
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <FormControl variant="standard">
          {success == false ? (
            <FormHelperText
              id="standard-weight-helper-text"
              sx={{ color: "red", fontFamily: "VT323" }}
            >
              PREENCHA ESTE CAMPO
            </FormHelperText>
          ) : null}

          <Input
            onChange={handleQuantityInput}
            onFocus={() => dispatch(eraseSucessAlert())}
            value={quantity}
            type="number"
            id="standard-adornment-weight"
            required
            endAdornment={
              <InputAdornment position="end">
                <Typography sx={{ fontFamily: "VT323", fontSize: 25 }}>
                  GR
                </Typography>
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            sx={{
              fontFamily: "VT323",
              fontSize: 20,
              width: 100,
            }}
            inputProps={{ style: { textAlign: "end" } }}
          />
          <FormHelperText
            id="standard-weight-helper-text"
            sx={{ fontFamily: "VT323", fontSize: 15 }}
          >
            QUANTIDADE
          </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ width: "auto" }}>
        <TableContainer component={Paper}>
          <Typography
            sx={{
              fontFamily: "VT323",
              fontSize: 23,
              textAlign: "center",
              borderBottom: 1,
              margin: 1,
            }}
          >
            INFORMAÇÃO NUTRICIONAL
          </Typography>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0, width: "100px" }}
                  align="center"
                ></TableCell>
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    fontSize: 16,
                    width: "70px",
                  }}
                  align="center"
                >
                  {quantity ? quantity : 0} G
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    fontSize: 16,
                    width: "70px",
                  }}
                  align="center"
                >
                  100 G
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    paddingLeft: 1,
                    fontSize: 15,
                  }}
                  align="left"
                >
                  CALORIAS (KCAL)
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(quantity as number, selected_food).kcal}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, selected_food).kcal}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    fontSize: 15,
                    paddingLeft: 1,
                  }}
                  align="left"
                >
                  CARBOÍDRATOS (G)
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(quantity as number, selected_food).carbs}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, selected_food).carbs}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    fontSize: 15,
                    paddingLeft: 1,
                  }}
                  align="left"
                >
                  PROTEÍNAS (G)
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(quantity as number, selected_food).protein}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, selected_food).protein}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  sx={{
                    fontFamily: "VT323",
                    padding: 0,
                    fontSize: 15,
                    paddingLeft: 1,
                  }}
                  align="left"
                >
                  GORDURAS (G)
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(quantity as number, selected_food).fat}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, selected_food).fat}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <CardActions>
        <Button
          sx={{ fontFamily: "VT323", margin: "0 auto", fontSize: 22 }}
          onClick={handleIncludeToInventory}
        >
          CADASTRAR
        </Button>
      </CardActions>
    </Card>
  );
};

export default IncludeToInventory;

import React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import { useEffect, useRef } from "react";
import BackupIcon from "@mui/icons-material/Backup";
import { includeToFreezer } from "../store/features/freezerSlice";
import { IIncludeToFreezer } from "../interfaces/FreezerInterfaces";
import { IGetFood } from "../interfaces/FoodInterfaces";
import { selectFood, selectQuantity } from "../store/features/freezerSlice";

import {
  Box,
  Alert,
  Divider,
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

const IncludeToFreezer = () => {
  const quantity = useAppSelector((state) => state.freezer.value);
  const [formResult, setFormResult] = useState<boolean | null>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const dispatch = useAppDispatch();
  const [showNutritionalInfo, setShowNutritionalInfo] =
    useState<boolean>(false);
  const food = useAppSelector((state) => state.freezer.food);
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

  const handleIncludeToFreezer = async () => {
    try {
      const new_food: IIncludeToFreezer = {
        user: userProfileInfo?.user_id,
        food: food?.id as number,
        quantity: quantity as number,
      };
      await dispatch(includeToFreezer(new_food)).unwrap();
      setFormResult(true);
      clearForm();
    } catch (e) {
      setFormResult(false);
    }
  };
  useEffect(() => {
    food ? setShowNutritionalInfo(true) : setShowNutritionalInfo(false);
  }, [food]);

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
    <Card variant="outlined" sx={{ p: 2, display: food ? "inherit" : "none" }}>
      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <FormControl variant="standard">
          <Input
            onChange={handleQuantityInput}
            value={quantity}
            type="number"
            id="standard-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                <Typography sx={{ fontFamily: "VT323", fontSize: 25 }}>
                  GR
                </Typography>
              </InputAdornment>
            }
            aria-describedby="standard-weight-helper-text"
            sx={{ fontFamily: "VT323", fontSize: 20 }}
            inputProps={{
              "aria-label": "weight",
            }}
          />
          <FormHelperText
            id="standard-weight-helper-text"
            sx={{ fontFamily: "VT323", fontSize: 15 }}
          >
            QUANTIDADE
          </FormHelperText>
        </FormControl>
      </Box>
      <Divider />
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
                  {calculateMacros(quantity as number, food).kcal}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, food).kcal}
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
                  {calculateMacros(quantity as number, food).carbs}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, food).carbs}
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
                  {calculateMacros(quantity as number, food).protein}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, food).protein}
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
                  {calculateMacros(quantity as number, food).fat}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: "VT323", padding: 0 }}
                  align="center"
                >
                  {calculateMacros(100, food).fat}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        variant="outlined"
        endIcon={<BackupIcon />}
        sx={{ width: "50%", display: "flex", margin: "0 auto", mt: 3 }}
        onClick={handleIncludeToFreezer}
      >
        CADASTRAR
      </Button>
    </Card>
  );
};

export default IncludeToFreezer;

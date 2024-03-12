import * as React from "react";
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
  Stack,
  Card,
  Paper,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import { change } from "../store/features/inputQuantitySlice";

export default function IncludeToFreezer() {
  const [food, setFood] = useState<IGetFood | null>(null);
  const [inputValue, setInputValue] = useState("");
  const foods = useAppSelector((state) => state.foods.food_list);
  const dispatch = useAppDispatch();
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const [formResult, setFormResult] = useState<boolean | null>(null);

  useEffect(() => {
    formResult == true
      ? setTimeout(() => {
          setFormResult(null);
        }, 6000)
      : null;
  }, [formResult]);

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

  const CardAddFood = () => {
    const globalQuantity = useAppSelector((state) => state.inputQuantity.value);
    const [quantity, setQuantity] = useState<number | string>(globalQuantity);
    const handleQuantityInput = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value = parseInt(e.target.value);
      if (value >= 0) {
        setQuantity((prev) => value);
        dispatch(change(value));
      } else {
        setQuantity((prev) => "");
      }
    };

    const clearForm = () => {
      setQuantity((prev) => "");
      dispatch(change(""));
      setFood(null);
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
    useEffect(() => {}, [quantity]);
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
      <Card variant="outlined" sx={{ p: 2 }}>
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
  return (
    <>
      <Box sx={{ p: 2 }}>
        {formResult ? (
          <Alert
            severity="success"
            sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
          >
            ALIMENTO CADASTRADO COM SUCESSO!
          </Alert>
        ) : formResult == false ? (
          <Alert
            severity="error"
            sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
          >
            ERRO AO CADASTRAR ALIMENTO!
          </Alert>
        ) : (
          <></>
        )}
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
            setFood(newFood);
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
      {food ? <CardAddFood /> : <></>}
    </>
  );
}

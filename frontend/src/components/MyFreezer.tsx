import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFreezer } from "../store/features/freezerSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { IGetFood } from "../interfaces/FoodInterfaces";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

const MyFreezer = () => {
  const my_freezer = useAppSelector((state) => state.freezer.food_list);
  const isRefreshed = useAppSelector((state) => state.freezer.refreshed);

  const dispatch = useAppDispatch();
  const fetchFreezer = async () => {
    try {
      await dispatch(getFreezer()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    !isRefreshed ? fetchFreezer() : null;
  }, [isRefreshed]);

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
    <>
      {my_freezer ? (
        my_freezer.map((props) => {
          return (
            <>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      ALIMENTO
                    </span>
                    : {props.food.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                    display={props.food.brand ? "inherit" : "none"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      MARCA
                    </span>
                    : {props.food.brand}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ fontSize: 18 }}
                >
                  <span style={{ textDecoration: "underline" }}>
                    DISPONIBILIDADE
                  </span>
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ display: "flex", gap: 10 }}>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      PORÇÃO: {props.quantity} G /
                    </Typography>
                    <Typography
                      color="green"
                      variant="body2"
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      {
                        calculateMacros(props.quantity as number, props.food)
                          .kcal
                      }
                      <span> KCAL</span>
                    </Typography>
                  </span>
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>PROTEÍNAS</span>
                      <span>
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .protein
                        }
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>CARBOÍDRATOS</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .carbs
                        }{" "}
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>GORDURA</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .fat
                        }
                        G
                      </span>
                    </Typography>
                  </span>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 3,
                    }}
                  >
                    <EditNoteIcon />
                    <DeleteIcon />
                    <LocalDiningIcon />
                  </Box>
                </Box>
              </Box>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default MyFreezer;

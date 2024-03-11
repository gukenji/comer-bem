import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
const MyMeals = () => {
  const my_foods = useAppSelector((state) => state.foods.food_list);
  const dispatch = useAppDispatch();
  const fetchFood = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      {my_foods ? (
        my_foods.map((food) => {
          return (
            <Box sx={{ p: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontFamily={"VT323"}
                  textTransform={"uppercase"}
                >
                  {food.name}
                </Typography>
              </Stack>
              <span style={{ display: "flex", gap: 10 }}>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  fontFamily={"VT323"}
                >
                  {food.portion_size} g
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  fontFamily={"VT323"}
                >
                  {food.kcal} kcal
                </Typography>
              </span>
              <Divider />
            </Box>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyMeals;

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import Box from "@mui/material/Box";
const MyMeals = () => {
  const dispatch = useAppDispatch();
  const fetchFood = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return <Box>MYMEALS.TSX</Box>;
};

export default MyMeals;

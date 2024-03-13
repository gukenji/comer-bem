import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
const MyMeals = () => {
  const dispatch = useAppDispatch();
  const fetchFood = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return <div>MYMEALS</div>;
};

export default MyMeals;

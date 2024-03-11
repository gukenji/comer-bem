import React, { useEffect } from "react";
import MyMeals from "../components/MyMeals";
import NewMeal from "../components/NewMeal";
import { Container } from "@mui/material";
const MealsPage = () => {
  return (
    <>
      <NewMeal />
      <MyMeals />
    </>
  );
};

export default MealsPage;

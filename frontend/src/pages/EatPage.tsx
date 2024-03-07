import React from "react";
import MyMeals from "../components/MyMeals";
import { Container } from "@mui/material";
import NewFood from "../components/NewFood";
import MyFoods from "../components/MyFoods";
const EatPage = () => {
  return (
    <>
      <NewFood />
      <MyFoods />
    </>
  );
};

export default EatPage;

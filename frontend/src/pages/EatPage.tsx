import React from "react";
import MyMeals from "../components/MyMeals";
import { Container } from "@mui/material";
import NewFood from "../components/NewFood";
import MyFreezer from "../components/MyFreezer";
const EatPage = () => {
  return (
    <>
      <NewFood />
      <MyFreezer />
    </>
  );
};

export default EatPage;

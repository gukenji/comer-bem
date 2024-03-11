import React from "react";
import MyMeals from "../components/MyMeals";
import { Container } from "@mui/material";
import NewFood from "../components/NewFood";
import Freezer from "../components/Freezer";
const EatPage = () => {
  return (
    <>
      <NewFood />
      <Freezer />
    </>
  );
};

export default EatPage;

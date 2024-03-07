import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  return <Container>HOMEPAGE</Container>;
};

export default HomePage;

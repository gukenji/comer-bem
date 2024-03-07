import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  return <div></div>;
};

export default HomePage;

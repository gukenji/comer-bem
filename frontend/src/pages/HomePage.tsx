import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";
const HomePage = () => {
  const authTokens = useAppSelector((state) => state.auth.tokenInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p>Name: {userProfileInfo?.username}</p>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;

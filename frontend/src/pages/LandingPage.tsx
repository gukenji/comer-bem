import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";
import { Container } from "@mui/material";
const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <Container>LP</Container>;
};

export default LandingPage;

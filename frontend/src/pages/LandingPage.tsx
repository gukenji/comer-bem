import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <div>LP</div>;
};

export default LandingPage;

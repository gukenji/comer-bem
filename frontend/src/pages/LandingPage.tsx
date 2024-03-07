import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const basicUserInfo = useAppSelector((state) => state.auth.tokenInfo);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
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
      <p>Landing Page</p>
    </div>
  );
};

export default LandingPage;

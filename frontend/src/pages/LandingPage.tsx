import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../store/features/authSlice";

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
  useEffect(() => {
    if (basicUserInfo) {
      dispatch(getUser(basicUserInfo.access));
    }
  }, [basicUserInfo]);

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
};

export default LandingPage;

import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const DefaultRoute = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  if (basicUserInfo) {
    return <Navigate replace to={"/home"} />;
  }
  return <Outlet />;
};

export default DefaultRoute;

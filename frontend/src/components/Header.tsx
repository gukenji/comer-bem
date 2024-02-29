import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
const Header = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  return (
    <div>
      <p>{basicUserInfo?.name}</p>
      <Link to="/home"> Home</Link>
      <Link to="/login"> Login</Link>
    </div>
  );
};

export default Header;

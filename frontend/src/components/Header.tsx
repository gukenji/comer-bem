import { Link } from "react-router-dom";
import { useAppSelector } from "../store/store";
const Header = () => {
  return (
    <div>
      <Link to="/home"> Home</Link>
      <Link to="/login"> Login</Link>
      <Link to="/add-meal"> Add Meal</Link>
    </div>
  );
};

export default Header;

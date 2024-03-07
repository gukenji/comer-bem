import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";
import padlock from "../assets/padlock.svg";
export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Toolbar>
          {auth && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {userProfileInfo ? (
                <p style={{ color: "black" }}>Olá, {userProfileInfo?.name}!</p>
              ) : (
                <></>
              )}
              <IconButton
                size="large"
                aria-label="my account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <AccountCircle sx={{ fontSize: { xs: 35, lg: 50 } }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!userProfileInfo ? (
                  <MenuItem>
                    <Link to="/login">Login</Link>
                  </MenuItem>
                ) : (
                  <></>
                )}
                {userProfileInfo ? (
                  <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
                ) : (
                  <></>
                )}
                {userProfileInfo ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                  <></>
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

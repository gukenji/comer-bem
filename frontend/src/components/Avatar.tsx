import React from "react";
import { Pixelify } from "react-pixelify";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Icon,
  Typography,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../store/store";
import profile_pic from "../assets/profile.jpeg";
import { logout } from "../store/features/authSlice";
import { IconButtonStyled } from "../styles/IconButtonStyled";
const Avatar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await dispatch(logout()).unwrap();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: userProfileInfo ? "inherit" : "none" }}>
      <IconButtonStyled
        aria-label="my account"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{ display: "flex", flexDirection: "column", boxShadow: "none" }}
      >
        <Icon
          sx={{
            width: greaterThanMid ? 100 : 80,
            height: greaterThanMid ? 100 : 80,
            borderRadius: 2,
          }}
        >
          <Pixelify
            src={profile_pic}
            pixelSize={2}
            centered={true}
            width={greaterThanMid ? 100 : 80}
            height={greaterThanMid ? 100 : 80}
          />
        </Icon>
        <Typography
          sx={{
            color: "black",
            fontFamily: "VT323",
            fontSize: 18,
          }}
        >
          LEVEL {userProfileInfo?.level}
        </Typography>
      </IconButtonStyled>
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
        ) : null}
        {userProfileInfo ? (
          <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
        ) : null}
        {userProfileInfo ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : null}
      </Menu>
    </Box>
  );
};

export default Avatar;

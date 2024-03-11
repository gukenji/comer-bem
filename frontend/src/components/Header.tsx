import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";
import { Pixelify } from "react-pixelify";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
import { Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import profile_pic from "../assets/profile.jpeg";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import kcal_pic from "../assets/kcal.png";
import level_pic from "../assets/level.png";
export default function Header() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const consumed_kcal = 1000;
  const meta_kcal = 2700;
  const level = userProfileInfo?.level;
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
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          display: "flex",
        }}
      >
        <Toolbar>
          {auth && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <IconButton
                size="large"
                aria-label="my account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Icon
                  sx={{
                    width: { xs: 65, md: 65 },
                    height: { xs: 65, md: 65 },
                    borderRadius: 50,
                  }}
                >
                  <Pixelify
                    src={profile_pic}
                    pixelSize={2}
                    centered={true}
                    width={greaterThanMid ? 65 : 65}
                    height={greaterThanMid ? 65 : 65}
                  />
                </Icon>
              </IconButton>
              {userProfileInfo ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.4,
                  }}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "VT323",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <span>olá, {userProfileInfo?.name}!</span>
                    <span>LVL {level}</span>
                  </Typography>
                  <Container>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(consumed_kcal / meta_kcal) * 100}
                    />
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "VT323",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <img src={kcal_pic} width={12} height={14} />
                        {consumed_kcal}/{meta_kcal}
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        KCAL
                      </span>
                    </Typography>
                  </Container>
                  <Container>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(consumed_kcal / meta_kcal) * 100}
                    />
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "VT323",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <img src={level_pic} width={12} height={14} />
                        {consumed_kcal}/{meta_kcal}
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        EXP
                      </span>
                    </Typography>
                  </Container>
                </Container>
              ) : (
                <></>
              )}
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

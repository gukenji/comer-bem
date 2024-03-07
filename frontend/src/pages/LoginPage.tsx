import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { login } from "../store/features/authSlice";
import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  createSvgIcon,
} from "@mui/material";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useAppSelector((state) => state.auth.error);
  const padlock = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
    >
      <defs>
        <filter id="pixelate">
          <feFlood x="10" y="10" height="1" width="1" />
          <feComposite width="3" height="3" />
          <feTile result="tileResult" />
          <feComposite in="SourceGraphic" in2="tileResult" operator="in" />
          <feMorphology operator="dilate" radius="1" />
        </filter>
      </defs>
      <g filter="url(#pixelate)">
        <path
          fill="#424242"
          d="M24,4c-5.5,0-10,4.5-10,10v9h4v-9c0-3.3,2.7-6,6-6s6,2.7,6,6v9h4v-9C34,8.5,29.5,4,24,4z"
        />
        <path
          fill="#fb8c00"
          d="M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"
        />
        <path
          fill="#c76e00"
          d="M24,28c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3s3-1.3,3-3C27,29.3,25.7,28,24,28z"
        />
      </g>
    </svg>
  );
  const PadlockIcon = createSvgIcon(padlock, "pad");

  const handleLogin = async () => {
    if (email && password) {
      try {
        await dispatch(login({ email, password })).unwrap();
      } catch (e) {
        console.error(e);
      }
    } else {
      console.log("teste");
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PadlockIcon fontSize="large" />
          <Typography variant="h5" sx={{ fontFamily: "VT323" }}>
            LOGIN
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "VT323",
                fontSize: { xs: 20, md: 25 },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;

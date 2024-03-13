import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { login } from "../store/features/authSlice";
import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { PadlockIcon } from "../styles/PadlockIcon";
import { LoginButton } from "../styles/LoginButton";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div>
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
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              InputLabelProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
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
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              InputLabelProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <LoginButton
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "VT323",
                fontSize: { xs: 20, md: 25 },
                background: "#3ca370",
              }}
              onClick={handleLogin}
            >
              Login
            </LoginButton>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Não possui conta? Clique aqui</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;

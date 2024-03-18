import { useAppDispatch } from "../store/store";
import { useState } from "react";
import { resetRefresh } from "../store/features/inventorySlice";
import { login } from "../store/features/authSlice";
import { Link } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Alert,
  Grid,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { PadlockIcon } from "../styles/PadlockIcon";
import { LoginButton } from "../styles/LoginButton";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    if (email && password) {
      try {
        await dispatch(login({ email, password })).unwrap();
        await dispatch(resetRefresh());
      } catch (e) {
        setError(true);
        console.log(e);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const helperText = (
    <FormHelperText
      id="standard-weight-helper-text"
      sx={{ color: "red", fontFamily: "VT323", fontSize: 17 }}
    >
      PREENCHA ESTE CAMPO
    </FormHelperText>
  );
  const errorMessage = (
    <Box sx={{ width: "100%" }}>
      {error ? (
        <Alert
          severity="error"
          sx={{
            mt: 2,
            fontFamily: "VT323",
            fontSize: 19,
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          ERRO NO LOGIN!
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
  return (
    <Box>
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
          {errorMessage}
          <Box sx={{ mt: 1, width: "100%" }}>
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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onClick={(e) => setError(false)}
            />
            {error && email.length < 1 ? helperText : <></>}

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
              onClick={(e) => setError(false)}
            />
            {error && password.length < 1 ? helperText : <></>}
            <LoginButton
              fullWidth
              className={error ? "error" : ""}
              disabled={
                loading || password.length < 1 || email.length < 1
                  ? true
                  : false
              }
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "VT323",
                fontSize: { xs: 20, md: 25 },
                background: !error ? "#3ca370" : "#c32454",
              }}
              onClick={handleLogin}
            >
              {loading ? <CircularProgress color="success" /> : "LOGIN"}{" "}
            </LoginButton>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/register">Não possui conta? Clique aqui</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;

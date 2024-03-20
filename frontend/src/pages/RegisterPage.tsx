import { useAppDispatch } from "../store/store";
import { useEffect, useState } from "react";
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
import { LoginButton } from "../styles/LoginButton";
import Certificate from "../assets/certificate.png";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    if (email && password && passwordConfirmation == password) {
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

  useEffect(() => {
    password != passwordConfirmation &&
    password.length > 0 &&
    passwordConfirmation.length > 0
      ? setPasswordConfirmationError("SENHAS NÃO COINCIDEM")
      : setPasswordConfirmationError("");
  }, [password, passwordConfirmation]);

  useEffect(() => {}, []);

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
    <Box sx={{}}>
      <Container maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 0.5,
            padding: 3,
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
            backgroundImage: `url(${Certificate})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            opacity: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "VT323",
              fontSize: 30,
              letterSpacing: 2,
              paddingTop: 8,
            }}
          >
            CRIAR USUÁRIO
          </Typography>
          {errorMessage}
          <Box sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  backgroundColor: "rgba(255,255,255,0)",
                },
              }}
              InputLabelProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              fullWidth
              id="email"
              label="EMAIL"
              name="email"
              sx={{
                "& fieldset": { border: 0.1 },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                    border: 1,
                  },
                },
              }}
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
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  backgroundColor: "rgba(255,255,255,0)",
                },
              }}
              InputLabelProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              id="password"
              name="password"
              label="SENHA"
              type="password"
              value={password}
              sx={{
                "& fieldset": { border: 0.1 },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                    border: 1,
                  },
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onClick={(e) => setError(false)}
            />
            {error && password.length < 1 ? helperText : <></>}
            <TextField
              margin="normal"
              required
              fullWidth
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  backgroundColor: "rgba(255,255,255,0)",
                },
              }}
              InputLabelProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              id="password_confirmation"
              name="password_confirmation"
              label="CONFIRME A SENHA"
              type="password"
              sx={{
                "& fieldset": { border: 0.1 },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black",
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "black",
                    border: 1,
                  },
                },
              }}
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              onClick={(e) => setError(false)}
            />
            <FormHelperText
              id="standard-weight-helper-text"
              sx={{ color: "red", fontFamily: "VT323", fontSize: 17 }}
            >
              {passwordConfirmationError}
            </FormHelperText>

            <LoginButton
              fullWidth
              className={error ? "error" : ""}
              disabled={
                loading ||
                password.length < 1 ||
                email.length < 1 ||
                passwordConfirmation != password
                  ? true
                  : false
              }
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontFamily: "VT323",
                fontSize: { xs: 25, md: 25 },
                background: !error ? "#3ca370" : "#c32454",
              }}
              onClick={handleRegister}
            >
              {loading ? <CircularProgress color="success" /> : "AVANÇAR"}{" "}
            </LoginButton>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/login">Já possui conta? Clique aqui</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;

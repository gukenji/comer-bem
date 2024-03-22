import {
  Box,
  CircularProgress,
  FormHelperText,
  TextField,
} from "@mui/material";
import { NextButton } from "../styles/NextButton";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import next from "../assets/next_pixelated.png";
import next_disabled from "../assets/next_disabled_pixelated.png";
import { getUser } from "../store/features/authSlice";
import { setFirstStep } from "../store/features/registerSlice";
const RegisterFirstStep = () => {
  const step = useAppSelector((state) => state.register.step);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const [userExist, setUserExist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const first_step = {
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  };
  const emailHelperText = (
    <FormHelperText
      id="standard-weight-helper-text"
      sx={{ color: "red", fontFamily: "VT323", fontSize: 17 }}
    >
      {userExist && error ? "EMAIL JÁ CADASTRADO!" : null}
    </FormHelperText>
  );

  const handleNextStep = async () => {
    setLoading(true);
    setUserExist(null);
    if (email && password && passwordConfirmation == password && step == 1) {
      try {
        const result = await dispatch(getUser({ email })).unwrap();
        setUserExist((prev) => result);
      } catch (e) {
        setError(true);
        console.log(e);
      }
    } else if (step == 2) {
      console.log("step 2");
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userExist !== null) {
      userExist ? setError((prev) => true) : dispatch(setFirstStep(first_step));
    }
  }, [userExist]);

  useEffect(() => {
    password != passwordConfirmation &&
    password.length > 0 &&
    passwordConfirmation.length > 0
      ? setPasswordConfirmationError("SENHAS NÃO COINCIDEM")
      : setPasswordConfirmationError("");
  }, [password, passwordConfirmation]);

  return (
    <Box display={step == 1 ? "inherit" : "none"}>
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
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        fullWidth
        id="email"
        label="EMAIL"
        name="email"
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
          },
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
      {emailHelperText}
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
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        id="password"
        name="password"
        label="SENHA"
        type="password"
        value={password}
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
          },
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
        InputLabelProps={{
          style: {
            fontFamily: "VT323",
            fontSize: 20,
            color: "rgba(0, 0, 0, 0.87)",
          },
        }}
        id="password_confirmation"
        name="password_confirmation"
        label="CONFIRME A SENHA"
        type="password"
        sx={{
          "& fieldset": { border: 0.1 },
          "& input:focus": {
            boxShadow: "2.6px 5.3px 5.3px hsl(0deg 0% 0% / 0.42)",
          },
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

      <NextButton
        className={error ? "error" : ""}
        disabled={
          loading ||
          error ||
          password.length < 1 ||
          email.length < 1 ||
          passwordConfirmation != password
            ? true
            : false
        }
        variant="contained"
        sx={{
          mb: 2,
          padding: 0,
          float: "right",
          fontFamily: "VT323",
          background: !error ? "none" : "none",
          border: "none",
          boxShadow: "none",
          justifyContent: "flex-end",
        }}
        onClick={handleNextStep}
      >
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <img
            src={
              loading ||
              password.length < 1 ||
              email.length < 1 ||
              passwordConfirmation != password
                ? next_disabled
                : next
            }
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        )}
      </NextButton>
    </Box>
  );
};

export default RegisterFirstStep;

import {
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import FileUploader from "./FileUploader";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { NextButton } from "../styles/NextButton";
import { registerUser, setSecondStep } from "../store/features/registerSlice";
import { IRegisterSecondStep } from "../interfaces/RegisterInterfaces";
import home_disabled from "../assets/home_disabled_pixelated.png";
import home from "../assets/home_pixelated.png";
import { login } from "../store/features/authSlice";
import { resetRefresh } from "../store/features/inventorySlice";
const RegisterSecondStep = () => {
  const step = useAppSelector((state) => state.register.step);
  const email = useAppSelector((state) => state.register.email) as string;
  const password = useAppSelector((state) => state.register.password) as string;

  const [name, setName] = useState("");
  const [height, setHeight] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [isMale, setIsMale] = useState<boolean | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState(false);
  const [isDot, setIsDot] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const second_step: IRegisterSecondStep = {
    name: name,
    height: height,
    weight: weight,
    age: age,
    is_male: isMale,
    profile_pic: images[0],
  };
  const integer_regex = /^[0-9]+(?!\.,)$/;
  const handleRegister = async () => {
    setLoading(true);
    if (name && height && weight && age && isMale != null && step == 2) {
      dispatch(setSecondStep(second_step));
      try {
        const result = await dispatch(registerUser()).unwrap();
        await dispatch(login({ email, password })).unwrap();
        await dispatch(resetRefresh());
      } catch (e) {
        setError(true);
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <Box display={step == 2 ? "inherit" : "none"}>
      <FileUploader images={images} setImages={setImages}></FileUploader>
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
        id="name"
        label="NOME"
        name="name"
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
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onClick={(e) => setError(false)}
      />
      <Box>
        <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>SEXO</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={isMale}
          name="radio-buttons-group"
          row
          value={isMale == true ? "male" : isMale == null ? "null" : "female"}
          onChange={(e) => {
            e.target.value === "female" ? setIsMale(false) : setIsMale(true);
            console.log(isMale);
          }}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={
              <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>
                FEM
              </Typography>
            }
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={
              <Typography sx={{ fontFamily: "VT323", fontSize: 20 }}>
                MASC
              </Typography>
            }
          />
        </RadioGroup>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25%" }}>
          <Input
            id="standard-adornment-weight"
            type="number"
            onChange={(e) => {
              setWeight(parseFloat(e.target.value));
            }}
            endAdornment={
              <InputAdornment position="end">
                {" "}
                <span style={{ fontFamily: "VT323" }}>KG</span>
              </InputAdornment>
            }
            sx={{
              "& input:focus": {
                boxShadow: "none",
              },
              ":after": {
                borderBottom: "2px solid black",
                boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              style: {
                fontFamily: "VT323",
                fontSize: 20,
                backgroundColor: "rgba(255,255,255,0)",
                textAlign: "end",
              },
            }}
          />
          <FormHelperText
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
          >
            PESO
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25%" }}>
          <Input
            id="standard-adornment-weight"
            type="number"
            value={height ? height : ""}
            onKeyDown={(e) => {
              e.key == "." || e.key == ","
                ? setIsDot((prev) => true)
                : setIsDot((prev) => false);
            }}
            onChange={(e) => {
              if (e.target.value == "" && isDot) {
                setHeight((prev) => prev);
              }
              if (
                (e.target.value == "" && !isDot) ||
                parseFloat(e.target.value) < 1
              ) {
                setHeight((prev) => null);
              }
              if (integer_regex.test(e.target.value)) {
                setHeight((prev) => parseInt(e.target.value));
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                {" "}
                <span style={{ fontFamily: "VT323" }}>CM</span>
              </InputAdornment>
            }
            sx={{
              "& input:focus": {
                boxShadow: "none",
              },
              ":after": {
                borderBottom: "2px solid black",
                boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              style: {
                fontFamily: "VT323",
                fontSize: 20,
                backgroundColor: "rgba(255,255,255,0)",
                textAlign: "end",
              },
            }}
          />
          <FormHelperText
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
            id="standard-weight-helper-text"
          >
            ALTURA
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25%" }}>
          <Input
            type="number"
            value={age ? age : ""}
            onKeyDown={(e) => {
              e.key == "." || e.key == ","
                ? setIsDot((prev) => true)
                : setIsDot((prev) => false);
            }}
            onChange={(e) => {
              if (e.target.value == "" && isDot) {
                setAge((prev) => prev);
              }
              if (
                (e.target.value == "" && !isDot) ||
                parseFloat(e.target.value) < 1
              ) {
                setAge((prev) => null);
              }
              if (integer_regex.test(e.target.value)) {
                setAge((prev) => parseInt(e.target.value));
              }
            }}
            id="standard-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                {" "}
                <span style={{ fontFamily: "VT323" }}>ANOS</span>
              </InputAdornment>
            }
            sx={{
              "& input:focus": {
                boxShadow: "none",
              },
              ":after": {
                borderBottom: "2px solid black",
                boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
              },
              "& input[type=number]": {
                "-moz-appearance": "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
              },
            }}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              style: {
                fontFamily: "VT323",
                fontSize: 20,
                backgroundColor: "rgba(255,255,255,0)",
                textAlign: "end",
              },
            }}
          />
          <FormHelperText
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 15 }}
            id="standard-weight-helper-text"
          >
            IDADE
          </FormHelperText>
        </FormControl>
      </Box>
      <NextButton
        className={error ? "error" : ""}
        disabled={loading || error || name.length < 1 ? true : false}
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
        onClick={handleRegister}
      >
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <img
            src={loading || name.length < 1 ? home_disabled : home}
            style={{ width: 50, height: 50, borderRadius: 5 }}
          />
        )}
      </NextButton>
    </Box>
  );
};

export default RegisterSecondStep;

import * as React from "react";
import { useEffect } from "react";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Fade from "@mui/material/Fade";
import { Button, Box, TextField, Container } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { styled } from "@mui/material/styles";
import { createFood } from "../store/features/foodsSlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { IFood } from "../interfaces/FoodInterfaces";

import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
export default function NewFood() {
  const [expanded, setExpanded] = React.useState(false);
  const [brand, setBrand] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [portionSize, setPortionSize] = useState<number | null>(null);
  const [isCustomPortion, setIsCustomPortion] = useState<boolean>(false);
  const [portionDescription, setPortionDescription] = useState<string | null>(
    ""
  );
  const [kcal, setKcal] = useState<number | null>(null);
  const [protein, setProtein] = useState<number | null>(null);
  const [carbs, setCarbs] = useState<number | null>(null);
  const [fat, setFat] = useState<number | null>(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const dispatch = useAppDispatch();

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleCustomPortion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selection = event.target.value;
    selection == "false" ? setIsCustomPortion(false) : setIsCustomPortion(true);
    console.log(isCustomPortion);
  };

  const handleCreateFood = async () => {
    try {
      const food: IFood = {
        brand: brand,
        name: name,
        portion_size: portionSize,
        is_custom_portion: isCustomPortion,
        portion_description: portionDescription,
        kcal: kcal,
        protein: protein,
        carbs: carbs,
        fat: fat,
        user: userProfileInfo?.user_id,
      };
      await dispatch(createFood(food)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    position: "relative",
    textDecoration: "none",
    "&:before": {
      content: expanded ? "''" : null,
      position: expanded ? "absolute" : "relative",
      display: "block",
      background: "black",
      width: "100%",
      height: "2px",
      bottom: 0,
      left: 0,
      transform: expanded ? "scaleX(1) " : "scaleX(0)",
    },
  }));
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade as AccordionSlots["transition"] }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
          "& .MuiAccordionDetails-root": {
            display: expanded ? "block" : "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ maxHeight: 64, minHeight: 30 }}
        >
          <TypographyStyled
            sx={{ fontFamily: "VT323", fontSize: { xs: 25, md: 35 } }}
          >
            CADASTRAR ALIMENTO
          </TypographyStyled>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              fullWidth
              id="brand"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="MARCA"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <TextField
              fullWidth
              id="name"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="ALIMENTO"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              required
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div style={{ paddingTop: 20 }}>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                sx={{ fontFamily: "VT323" }}
              >
                PORÇÃO CUSTOMIZADA? (ex.: 1 fatia)
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={isCustomPortion}
                onChange={handleCustomPortion}
                sx={{ mb: 0 }}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={<Typography fontFamily={"VT323"}>NÃO</Typography>}
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label={<Typography fontFamily={"VT323"}>SIM</Typography>}
                />
              </RadioGroup>
            </div>{" "}
            <TextField
              fullWidth
              id="custom_portion"
              InputLabelProps={{
                sx: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  display: isCustomPortion ? "inherit" : "none",
                },
              }}
              required={isCustomPortion}
              label="DESCRIÇÃO (ex.: 1 fatia)"
              inputProps={{
                style: {
                  fontFamily: "VT323",
                  fontSize: 20,
                  display: isCustomPortion ? "inherit" : "none",
                },
              }}
              onChange={(e) => {
                setPortionDescription(e.target.value);
              }}
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="portion_size"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PORÇÃO (GR)"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setPortionSize(parseFloat(e.target.value));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="kcal"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CALORIAS (KCAL)"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setKcal(parseFloat(e.target.value));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="protein"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PROTEÍNAS (GR)"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setProtein(parseFloat(e.target.value));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="carbs"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CARBOÍDRATOS (GR)"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setCarbs(parseFloat(e.target.value));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="fat"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="GORDURA (GR)"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              variant="standard"
              onChange={(e) => {
                setFat(parseFloat(e.target.value));
              }}
            />
            <Button
              variant="outlined"
              endIcon={<BackupIcon />}
              sx={{ width: "50%", alignSelf: "center", mt: 3 }}
              onClick={handleCreateFood}
            >
              CADASTRAR
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

import * as React from "react";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { Button, Box, TextField, Container } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { styled } from "@mui/material/styles";
import { createFood } from "../store/features/foodsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
export default function NewFood() {
  const [expanded, setExpanded] = React.useState(false);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [portionSize, setPortionSize] = useState(null);
  const [isCustomPortion, setIsCustomPortion] = useState(null);
  const [portionDescription, setPortionDescription] = useState("");
  const [kcal, setKcal] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);
  const [fat, setFat] = useState(null);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);

  const dispatch = useAppDispatch();
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleCreateFood = async () => {
    try {
      const food = {
        brand: brand,
        name: name,
        portion_size: parseFloat(portionSize),
        is_custom_portion: false,
        portion_description: portionDescription,
        kcal: parseFloat(kcal),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        user: userProfileInfo?.user_id,
      };
      console.log(food);
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
              label="Marca"
              variant="standard"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <TextField
              fullWidth
              id="name"
              label="Alimento"
              required
              variant="standard"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <TextField
              fullWidth
              required
              type="number"
              id="portion_size"
              label="Porção (gr)"
              variant="standard"
              onChange={(e) => {
                setPortionSize(e.target.value);
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="kcal"
              label="Calorias (kcal)"
              variant="standard"
              onChange={(e) => {
                setKcal(e.target.value);
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="protein"
              label="Proteínas (gr)"
              variant="standard"
              onChange={(e) => {
                setProtein(e.target.value);
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="carbs"
              label="Carboidratos (gr)"
              variant="standard"
              onChange={(e) => {
                setCarbs(e.target.value);
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="fat"
              label="Gordura (gr)"
              variant="standard"
              onChange={(e) => {
                setFat(e.target.value);
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

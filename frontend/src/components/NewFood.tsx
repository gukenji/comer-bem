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
import { IFood } from "../interfaces/FoodInterfaces";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useRef } from "react";
export default function NewFood() {
  const [formResult, setFormResult] = useState<boolean | null>(null);
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [brand, setBrand] = useState<string | null>("");
  const [name, setName] = useState<string>("");
  const [portionSize, setPortionSize] = useState<number | string>("");
  const [isCustomPortion, setIsCustomPortion] = useState<boolean>(false);
  const [portionDescription, setPortionDescription] = useState<string | null>(
    ""
  );
  const [kcal, setKcal] = useState<number | string>("");
  const [protein, setProtein] = useState<number | string>("");
  const [carbs, setCarbs] = useState<number | string>("");
  const [fat, setFat] = useState<number | string>("");
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const formRef = useRef<HTMLFormElement>();
  const dispatch = useAppDispatch();
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleCustomPortion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selection = event.target.value;
    selection == "false" ? setIsCustomPortion(false) : setIsCustomPortion(true);
  };
  const clearForm = () => {
    setBrand((prev) => "");
    setName((prev) => "");
    setPortionSize((prev) => "");
    setIsCustomPortion((prev) => false);
    setPortionDescription((prev) => "");
    setKcal((prev) => "");
    setProtein((prev) => "");
    setCarbs((prev) => "");
    setFat((prev) => "");
    formRef.current != undefined ? formRef.current.reset() : null;
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
      setFormResult(true);
      clearForm();
    } catch (e) {
      setFormResult(false);
    }
  };
  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      O ALIMENTO CADASTRADO SERÁ INSERIDO NO BANCO DE DADOS. <br />
      DESSA FORMA QUALQUER PESSOA QUE QUISER INCLUIR ALGUM ALIMENTO EM SUA
      GELADEIRA OU EM SUA REFEIÇÃO POSTERIORMENTE PODERÁ UTILIZAR ESTE ALIMENTO
      CADASTRADO
    </Typography>
  );
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
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    formResult == true
      ? setTimeout(() => {
          setFormResult(null);
        }, 6000)
      : null;
  }, [formResult]);
  return (
    <>
      <Accordion
        expanded={expanded}
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
          expandIcon={<ExpandMoreIcon onClick={handleExpansion} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ maxHeight: 64, minHeight: 30 }}
        >
          {" "}
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom-start"
              title={toolTipText}
              arrow
            >
              <IconButton onClick={handleTooltipOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
          <TypographyStyled
            sx={{ fontFamily: "VT323", fontSize: { xs: 25, md: 35 } }}
          >
            CADASTRAR ALIMENTO{" "}
          </TypographyStyled>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            noValidate
            ref={formRef}
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column" }}
            onChange={() => setFormResult(null)}
          >
            {formResult ? (
              <Alert
                severity="success"
                sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
              >
                ALIMENTO CADASTRADO COM SUCESSO!
              </Alert>
            ) : formResult == false ? (
              <Alert
                severity="error"
                sx={{ mt: 2, fontFamily: "VT323", fontSize: 15 }}
              >
                ERRO AO CADASTRAR ALIMENTO!
              </Alert>
            ) : (
              <></>
            )}
            <TextField
              fullWidth
              id="brand"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="MARCA"
              value={brand}
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
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !name && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              required
              value={name}
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
              label="DESCRIÇÃO"
              helperText={
                <span
                  style={{
                    display: isCustomPortion ? "flex" : "none",
                    flexDirection: "column",
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ margin: 0, padding: 0 }}>ex.: 1 fatia</span>
                  {isCustomPortion &&
                  !portionDescription &&
                  formResult == false ? (
                    <span style={{ margin: 0, padding: 0, color: "red" }}>
                      PREENCHIMENTO NECESSÁRIO
                    </span>
                  ) : null}
                </span>
              }
              FormHelperTextProps={{
                sx: { fontFamily: "VT323" },
              }}
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
              value={portionDescription}
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="portion_size"
              value={portionSize}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !portionSize && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PORÇÃO (GR)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setPortionSize((prev) => (value >= 1 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="kcal"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CALORIAS (KCAL)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setKcal((prev) => (value >= 0 ? value : NaN));
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !kcal && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              value={kcal}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="protein"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="PROTEÍNAS (GR)"
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !protein && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              variant="standard"
              value={protein}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setProtein((prev) => (value >= 0 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              value={carbs}
              id="carbs"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="CARBOÍDRATOS (GR)"
              inputProps={{
                min: 0,
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !carbs && formResult == false
                  ? "PREENCHIMENTO NECESSÁRIO"
                  : null
              }
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setCarbs((prev) => (value >= 0 ? value : NaN));
              }}
            />
            <TextField
              fullWidth
              required
              type="number"
              id="fat"
              value={fat}
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="GORDURA (GR)"
              inputProps={{
                style: { fontFamily: "VT323", fontSize: 20 },
              }}
              FormHelperTextProps={{
                sx: { color: "red", fontFamily: "VT323" },
              }}
              helperText={
                !fat && formResult == false ? "PREENCHIMENTO NECESSÁRIO" : null
              }
              variant="standard"
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                setFat((prev) => (value >= 0 ? value : NaN));
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

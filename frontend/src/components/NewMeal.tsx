import * as React from "react";
import { ExpandMore, AddCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  AccordionSummary,
  Typography,
  AccordionSlots,
  Accordion,
  useMediaQuery,
  Fade,
  AccordionDetails,
  MenuItem,
  Icon,
  ClickAwayListener,
  IconButton,
  Tooltip,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { Pixelify } from "react-pixelify";
import { setOpenIcon } from "../store/features/mealsSlice";
import { styled } from "@mui/material/styles";
import { Info } from "@mui/icons-material";
import { AccordionSummaryStyled } from "../styles/AccordionSummaryStyled";
import { useAppDispatch, useAppSelector } from "../store/store";
import SelectMealIcon from "./SelectMealIcon";

export default function NewMeal() {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const open_icon = useAppSelector((state) => state.meals.open_icon);
  const icon = useAppSelector((state) => state.meals.icon);
  console.log(icon);
  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      CADASTRE E EDITE AS REFEIÇÕES COM OS RESPECTIVOS ALIMENTOS DO SEU
      DIA-A-DIA PARA FACILITAR O CONTROLE DA SUA ALIMENTAÇÃO. <br />
      ATRAVÉS DESSA FUNÇÃO VOCÊ TERÁ UMA VISÃO GERAL DA INGESTÃO TOTAL DE
      MACRONUTRIENTES POR REFEIÇÃO.
    </Typography>
  );

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
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
        <AccordionSummaryStyled
          expandIcon={<ExpandMore onClick={handleExpansion} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{ maxHeight: 64, minHeight: 30 }}
        >
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
                <Info />
              </IconButton>
            </Tooltip>
          </ClickAwayListener>
          <TypographyStyled
            sx={{ fontFamily: "VT323", fontSize: { xs: 25, md: 35 } }}
          >
            CADASTRAR REFEIÇÃO
          </TypographyStyled>
        </AccordionSummaryStyled>
        <AccordionDetails>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", gap: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={() => dispatch(setOpenIcon())}
            >
              {icon ? (
                <Avatar
                  alt="Selected Icon"
                  src={icon}
                  variant="square"
                  sx={{ width: "auto", height: "auto" }}
                />
              ) : (
                <AddCircle />
              )}

              <FormHelperText
                id="standard-weight-helper-text"
                sx={{ fontFamily: "VT323", fontSize: 17 }}
              >
                ÍCONE
              </FormHelperText>
            </Box>
            {open_icon ? <SelectMealIcon /> : null}

            <TextField
              fullWidth
              id="name"
              InputLabelProps={{ sx: { fontFamily: "VT323", fontSize: 20 } }}
              label="REFEIÇÃO"
              inputProps={{ style: { fontFamily: "VT323", fontSize: 20 } }}
              required
              variant="standard"
            />
            <div style={{ paddingTop: 20 }}></div>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

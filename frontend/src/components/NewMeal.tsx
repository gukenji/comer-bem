import * as React from "react";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  Button,
  Box,
  TextField,
  Container,
  MenuItem,
  Icon,
} from "@mui/material";
import dinner_icon from "../assets/dinner.png";
import { Pixelify } from "react-pixelify";
import { styled } from "@mui/material/styles";

const currencies = [
  {
    value: "dinner",
    icon: dinner_icon,
  },
  {
    value: "dinner",
    icon: dinner_icon,
  },
  {
    value: "dinner",
    icon: dinner_icon,
  },
];

export default function NewMeal() {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
            CADASTRAR REFEIÇÃO
          </TypographyStyled>
        </AccordionSummary>
        <AccordionDetails>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              variant="standard"
              id="icon"
              select
              label="Ícone"
              helperText="Selecione o ícone da sua refeição"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Icon
                    sx={{
                      width: { xs: 50, md: 65 },
                      height: { xs: 50, md: 65 },
                    }}
                  >
                    <Pixelify
                      src={option.icon}
                      pixelSize={1}
                      centered={true}
                      width={greaterThanMid ? 30 : 65}
                      height={greaterThanMid ? 30 : 65}
                    />
                  </Icon>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              id="name"
              label="Refeição"
              required
              variant="standard"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

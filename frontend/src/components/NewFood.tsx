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

export default function NewFood() {
  const [expanded, setExpanded] = React.useState(false);

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
            <TextField fullWidth id="brand" label="Marca" variant="standard" />
            <TextField
              fullWidth
              id="name"
              label="Alimento"
              required
              variant="standard"
            />

            <TextField
              fullWidth
              required
              type="number"
              id="portion_size"
              label="Porção (gr)"
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="kcal"
              label="Calorias (kcal)"
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="protein"
              label="Proteínas (gr)"
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="carbs"
              label="Carboidratos (gr)"
              variant="standard"
            />
            <TextField
              fullWidth
              required
              type="number"
              id="fat"
              label="Gordura (gr)"
              variant="standard"
            />
            <Button
              variant="outlined"
              endIcon={<BackupIcon />}
              sx={{ width: "50%", alignSelf: "center", mt: 3 }}
            >
              CADASTRAR
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

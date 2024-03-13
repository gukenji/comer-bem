import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import Typography from "@mui/material/Typography";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Fade from "@mui/material/Fade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import MyFreezer from "./MyFreezer";
import SearchFoodFreezer from "./SearchFoodFreezer";
import IncludeToFreezer from "./IncludeToFreezer";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Freezer = () => {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const toolTipText = (
    <Typography sx={{ fontFamily: "VT323" }}>
      CADASTRE, EDITE E UTILIZE ALIMENTOS QUE VOCÊ POSSUI EM SUA
      DESPENSA/GELADEIRA. <br />
      AO CADASTRAR VOCÊ TERÁ UMA VISÃO FACILITADA DOS ALIMENTOS QUE PODERÁ
      CONSUMIR E UMA VISÃO MACRO DOS NUTRIENTES DISPONÍVEIS.
    </Typography>
  );
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
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
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
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
          MEUS ALIMENTOS
        </TypographyStyled>
      </AccordionSummary>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            TabIndicatorProps={{ style: { background: "#F48925" } }}
          >
            <Tab
              label="INCLUIR"
              value="1"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
            <Tab
              label="INVENTÁRIO"
              value="2"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
            <Tab
              label="RESUMO"
              value="3"
              sx={{ fontFamily: "VT323", fontSize: 20 }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SearchFoodFreezer />
          <IncludeToFreezer />
        </TabPanel>
        <TabPanel value="2">
          <MyFreezer />
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Accordion>
  );
};

export default Freezer;

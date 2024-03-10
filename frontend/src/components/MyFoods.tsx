import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFoods } from "../store/features/foodsSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Accordion, { AccordionSlots } from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Fade from "@mui/material/Fade";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const MyFoods = () => {
  const my_foods = useAppSelector((state) => state.foods.food_list);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = React.useState(false);

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
  const fetchFood = async () => {
    try {
      await dispatch(getFoods()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(my_foods);
    fetchFood();
  }, []);
  return (
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
          MEUS ALIMENTOS
        </TypographyStyled>
      </AccordionSummary>
      <AccordionDetails>
        {my_foods ? (
          my_foods.map((food) => {
            return (
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                  >
                    {food.name}
                  </Typography>
                </Stack>
                <span style={{ display: "flex", gap: 10 }}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    fontFamily={"VT323"}
                    fontSize={16}
                  >
                    {food.portion_size} G
                  </Typography>
                  <Typography
                    color="green"
                    variant="body2"
                    fontFamily={"VT323"}
                    fontSize={16}
                  >
                    {food.kcal} KCAL
                  </Typography>
                </span>
                <Divider />
              </Box>
            );
          })
        ) : (
          <></>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MyFoods;

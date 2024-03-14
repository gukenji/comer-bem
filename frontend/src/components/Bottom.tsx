import * as React from "react";
import { Box, CssBaseline, BottomNavigation, Paper } from "@mui/material";
import { PieChart, ViewList, Home, Kitchen } from "@mui/icons-material";
import "../main.css";
import { useNavigate } from "react-router-dom";
import { BottomNavigationActionHome } from "../styles/BottomNavigationActionHome";
import { BottomNavigationActionFoods } from "../styles/BottomNavigationActionFoods";
import { BottomNavigationActionMeals } from "../styles/BottomNavigationActionMeals";
import { BottomNavigationActionStatistics } from "../styles/BottomNavigationActionStatistics";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTab } from "../store/features/authSlice";
export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const tab = useAppSelector((state) => state.auth.tab);
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const linkHome = () => {
    navigate("/home");
  };
  const linkFoods = () => {
    navigate("/foods");
  };
  const linkMeals = () => {
    navigate("/meals");
  };
  const linkStatistics = () => {
    navigate("/statistics");
  };

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [tab]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={tab}
          onChange={(event, newValue) => {
            userProfileInfo ? dispatch(selectTab(newValue)) : null;
          }}
        >
          <BottomNavigationActionHome
            label="HOME"
            icon={<Home />}
            onClick={linkHome}
          />
          <BottomNavigationActionFoods
            label="ALIMENTOS"
            icon={<Kitchen />}
            onClick={linkFoods}
          />
          <BottomNavigationActionMeals
            label="REFEIÇÕES"
            icon={<ViewList />}
            onClick={linkMeals}
          />
          <BottomNavigationActionStatistics
            label="ESTATÍSTICAS"
            icon={<PieChart />}
            onClick={linkStatistics}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import PieChartIcon from "@mui/icons-material/PieChart";
import "../main.css";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useNavigate } from "react-router-dom";
import { BottomNavigationActionHome } from "../styles/BottomNavigationActionHome";
import { BottomNavigationActionFoods } from "../styles/BottomNavigationActionFoods";
import { BottomNavigationActionMeals } from "../styles/BottomNavigationActionMeals";
import { BottomNavigationActionStatistics } from "../styles/BottomNavigationActionStatistics";
import KitchenIcon from "@mui/icons-material/Kitchen";
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
            icon={<HomeIcon />}
            onClick={linkHome}
          />
          <BottomNavigationActionFoods
            label="ALIMENTOS"
            icon={<KitchenIcon />}
            onClick={linkFoods}
          />
          <BottomNavigationActionMeals
            label="REFEIÇÕES"
            icon={<ViewListIcon />}
            onClick={linkMeals}
          />
          <BottomNavigationActionStatistics
            label="ESTATÍSTICAS"
            icon={<PieChartIcon />}
            onClick={linkStatistics}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

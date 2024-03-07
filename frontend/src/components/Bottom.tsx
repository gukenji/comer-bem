import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import PieChartIcon from "@mui/icons-material/PieChart";
import "../main.css";
import ViewListIcon from "@mui/icons-material/ViewList";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { styled } from "@mui/material/styles";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const BottomNavigationActionStyled = styled(BottomNavigationAction)(
    ({ theme }) => ({
      "& .MuiBottomNavigationAction-label.Mui-selected": {
        [theme.breakpoints.up("xs")]: {
          fontSize: "1.2rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1.5rem",
        },
      },
      "& .MuiBottomNavigationAction-label": {
        [theme.breakpoints.up("xs")]: {
          fontSize: "1rem",
        },
        [theme.breakpoints.up("md")]: {
          fontSize: "1.2rem",
        },
      },
    })
  );

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationActionStyled label="HOME" icon={<HomeIcon />} />
          <BottomNavigationActionStyled
            label="COMER"
            icon={<LocalDiningIcon />}
          />
          <BottomNavigationActionStyled
            label="REFEIÇÕES"
            icon={<ViewListIcon />}
          />
          <BottomNavigationActionStyled
            label="ESTATÍSTICA"
            icon={<PieChartIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";

export const BottomNavigationActionMeals = styled(BottomNavigationAction)(
  ({ theme }) => ({
    "&.MuiButtonBase-root.Mui-selected": {
      [theme.breakpoints.up("xs")]: {
        background: "#80366b",
      },
      [theme.breakpoints.up("md")]: {
        background: "#80366b",
      },
    },
    "&.MuiButtonBase-root.Mui-selected , &.MuiSvgIcon-root": {
      [theme.breakpoints.up("xs")]: {
        color: "white",
      },
      [theme.breakpoints.up("md")]: {
        color: "white",
      },
    },
    "& .MuiBottomNavigationAction-label.Mui-selected": {
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.2rem",
        color: "white",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5rem",
        color: "white",
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

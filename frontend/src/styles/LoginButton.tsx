import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
export const LoginButton = styled(Button)(({ theme }) => ({
  "&:active": {
    [theme.breakpoints.up("xs")]: {
      background: "#3ca370",
    },
    [theme.breakpoints.up("md")]: {
      background: "#3ca370",
    },
  },
  "&:active.error": {
    [theme.breakpoints.up("xs")]: {
      background: "#c32454",
    },
    [theme.breakpoints.up("md")]: {
      background: "#c32454",
    },
  },
  "&:hover": {
    [theme.breakpoints.up("xs")]: {
      background: "#3ca370",
    },
    [theme.breakpoints.up("md")]: {
      background: "#3ca370",
    },
  },
  "&:hover.error": {
    [theme.breakpoints.up("xs")]: {
      background: "#c32454",
    },
    [theme.breakpoints.up("md")]: {
      background: "#c32454",
    },
  },
  "&:disabled": {
    [theme.breakpoints.up("xs")]: {
      background: "#3ca370",
    },
    [theme.breakpoints.up("md")]: {
      background: "#3ca370",
    },
  },
}));

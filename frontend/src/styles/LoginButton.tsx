import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
export const LoginButton = styled(Button)(({ theme }) => ({
  "&:active": {
    [theme.breakpoints.up("xs")]: {
      background: "#80366b",
    },
    [theme.breakpoints.up("md")]: {
      background: "#80366b",
    },
  },
  "&:hover": {
    [theme.breakpoints.up("xs")]: {
      background: "#80366b",
    },
    [theme.breakpoints.up("md")]: {
      background: "#80366b",
    },
  },
}));

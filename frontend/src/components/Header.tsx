import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useAppSelector, useAppDispatch } from "../store/store";
import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import kcal_pic from "../assets/kcal.png";
import level_pic from "../assets/level.png";
import Avatar from "./Avatar";
export default function Header() {
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const consumed_kcal = 1000;
  const meta_kcal = 2700;

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    borderRadius: 10,
    boxShadow:
      "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          display: "flex",
        }}
      >
        <Toolbar>
          {userProfileInfo && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              {userProfileInfo ? (
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.4,
                  }}
                >
                  <Container>
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "VT323",
                        fontSize: 18,
                      }}
                    >
                      LEVEL {userProfileInfo.level}
                    </Typography>

                    <BorderLinearProgress
                      variant="determinate"
                      value={(consumed_kcal / meta_kcal) * 100}
                    />
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "VT323",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <img src={kcal_pic} width={12} height={14} />
                        {consumed_kcal}/{meta_kcal}
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        KCAL
                      </span>
                    </Typography>
                  </Container>
                  <Container>
                    <BorderLinearProgress
                      variant="determinate"
                      value={(consumed_kcal / meta_kcal) * 100}
                    />
                    <Typography
                      sx={{
                        color: "black",
                        fontFamily: "VT323",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <img src={level_pic} width={12} height={14} />
                        {consumed_kcal}/{meta_kcal}
                      </span>
                      <span
                        style={{
                          color: "black",
                          fontSize: 16,
                        }}
                      >
                        EXP
                      </span>
                    </Typography>
                  </Container>
                </Container>
              ) : (
                <></>
              )}
            </div>
          )}
          <Avatar />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

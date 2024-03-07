import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
export default function MyMeals() {
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          maxWidth: 360,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the
            park or just down the hall.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Select type
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip color="primary" label="editar" size="small" />
            <Chip label="Medium" size="small" />
            <Chip label="Hard" size="small" />
          </Stack>
        </Box>
      </Card>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 360,
        }}
      >
        <Box sx={{ p: 2, borderRadius: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography gutterBottom variant="h5" component="div">
              Toothbrush
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            Pinstriped cornflower blue cotton blouse takes you on a walk to the
            park or just down the hall.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Select type
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip color="primary" label="editar" size="small" />
            <Chip label="Medium" size="small" />
            <Chip label="Hard" size="small" />
          </Stack>
        </Box>
      </Card>
    </div>
  );
}

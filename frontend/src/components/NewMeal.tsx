import React from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
const NewMeal = () => {
  return (
    <Container maxWidth="xs">
      {/* <CssBaseline /> */}
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">NOVA REFEIÇÃO</Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            // value={password}
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />

          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            CADASTRAR S
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NewMeal;

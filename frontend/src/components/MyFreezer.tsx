import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFreezer } from "../store/features/freezerSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

const MyFreezer = () => {
  const my_freezer = useAppSelector((state) => state.freezer.food_list);
  const dispatch = useAppDispatch();
  const fetchFreezer = async () => {
    try {
      await dispatch(getFreezer()).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchFreezer();
  }, []);

  return (
    <>
      {my_freezer ? (
        my_freezer.map((props) => {
          return (
            <>
              <Box sx={{ p: 1 }}>
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
                    {props.food.name}
                  </Typography>
                </Stack>
                <span style={{ display: "flex", gap: 10 }}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    fontFamily={"VT323"}
                    fontSize={16}
                  >
                    {props.food.portion_size}
                  </Typography>
                  <Typography
                    color="green"
                    variant="body2"
                    fontFamily={"VT323"}
                    fontSize={16}
                  >
                    {props.food.kcal} KCAL
                  </Typography>
                </span>
              </Box>
              <Divider />
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default MyFreezer;

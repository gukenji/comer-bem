import {
  Box,
  Card,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  eraseSucessAlert,
  setOpenDialog,
} from "../store/features/inventorySlice";
import { NutritionalTable } from "./NutritionalTable";
import { IFetchInventory } from "../interfaces/InventoryInterfaces";
import { PublishedWithChanges } from "@mui/icons-material";
import { updateInventory } from "../store/features/inventorySlice";
import AlertInput from "./AlertInput";
const EditInventoryItem = (props: { food: IFetchInventory }) => {
  const { food, id, quantity } = props.food;
  const open_dialog = useAppSelector((state) => state.inventory.open_dialog);
  const userProfileInfo = useAppSelector((state) => state.auth.userProfileData);
  const [result, setResult] = useState<boolean | null>(null);
  const [newQuantity, setNewQuantity] = useState<number | string>(quantity);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setOpenDialog());
  };
  const updateToInventory = async () => {
    try {
      const updated_inventory = {
        user: userProfileInfo?.user_id as number,
        food: food.id as number,
        quantity: newQuantity as number,
        id: id as number,
      };
      await dispatch(updateInventory(updated_inventory)).unwrap();
      setResult(true);
    } catch (e) {
      console.log(e);
      setResult(false);
    }
  };
  useEffect(() => {
    setResult(null);
  }, [newQuantity]);

  return (
    <Dialog
      open={open_dialog}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="column" justifyContent="space-between">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontFamily: "VT323", fontSize: 30 }}
          >
            <span style={{ textDecoration: "underline dotted" }}>
              ALIMENTO:
            </span>
            <span> {food.name}</span>
          </Typography>
          {food.brand ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontFamily: "VT323", fontSize: 30 }}
            >
              <span style={{ textDecoration: "underline dotted" }}>MARCA:</span>
              <span> {food.brand}</span>
            </Typography>
          ) : null}
        </Stack>
        <NutritionalTable quantity={newQuantity} food={food} />
      </Box>
      <Divider />
      <AlertInput result={result} />
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
          margin: 1,
          borderRadius: 5,
        }}
      >
        <Typography
          gutterBottom
          variant="body2"
          sx={{
            fontFamily: "VT323",
            fontSize: 23,
            margin: 0,
            textAlign: "center",
            textDecoration: "underline dotted",
          }}
        >
          QUANTIDADE
        </Typography>
        <Stack direction="row" spacing={1}>
          <Box>
            <Input
              autoFocus
              value={newQuantity}
              onClick={() => setResult((prev) => null)}
              onChange={(e) => setNewQuantity((prev) => e.target.value)}
              type="number"
              id="standard-adornment-weight"
              required
              endAdornment={
                <InputAdornment position="end">
                  <Typography sx={{ fontFamily: "VT323", fontSize: 25 }}>
                    GR
                  </Typography>
                </InputAdornment>
              }
              aria-describedby="standard-weight-helper-text"
              sx={{
                fontFamily: "VT323",
                fontSize: 24,
                width: 100,
                "& input:focus": {
                  boxShadow: "none",
                },
                ":after": {
                  borderBottom: "2px solid black",
                  boxShadow: "2.6px 5.3px 3px hsl(0deg 0% 0% / 0.42)",
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              }}
              inputProps={{ style: { textAlign: "end" } }}
            />
          </Box>
          <PublishedWithChanges
            sx={{ alignSelf: "center", fontSize: 30 }}
            onClick={updateToInventory}
          />
        </Stack>
      </Box>
    </Dialog>
  );
};

export default EditInventoryItem;

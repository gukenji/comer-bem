import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getFreezer } from "../store/features/freezerSlice";
import { IGetFood } from "../interfaces/FoodInterfaces";
import {
  Stack,
  Box,
  Typography,
  Divider,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { EditNote, Delete, LocalDining } from "@mui/icons-material";
import { quickSort } from "../utils/quickSort";
import { IFetchFreezer } from "../interfaces/FreezerInterfaces";
const MyFreezer = () => {
  const my_freezer = useAppSelector((state) => state.freezer.food_list);
  const [sortedFreezer, setSortedFreezer] = useState<IFetchFreezer[] | null>(
    null
  );
  const [currentFoods, setCurrentFoods] = useState<IFetchFreezer[] | null>(
    null
  );
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [foodsPerPage, setFoodsPerPage] = useState<number>(5);
  const isRefreshed = useAppSelector((state) => state.freezer.refreshed);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setIndex((prev) => (value - 1) * foodsPerPage);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchFreezer = async () => {
      try {
        await dispatch(getFreezer()).unwrap();
      } catch (e) {
        console.error(e);
      }
    };
    !isRefreshed ? fetchFreezer() : null;
  }, [isRefreshed, dispatch]);

  useEffect(() => {
    isRefreshed
      ? setSortedFreezer(quickSort(my_freezer as IFetchFreezer[]))
      : null;
  }, [isRefreshed, my_freezer]);

  useEffect(() => {
    const selectedFoods = sortedFreezer?.slice(
      (page - 1) * foodsPerPage,
      page * foodsPerPage
    );
    if (selectedFoods !== undefined) {
      setCurrentFoods(selectedFoods);
    }
  }, [page, foodsPerPage, sortedFreezer]);

  const handleFoodsPerPage = (e: SelectChangeEvent<number>) => {
    (e.target.value as number) >= 1
      ? setFoodsPerPage((prev) => e.target.value as number)
      : null;
  };
  useEffect(() => {
    const new_page =
      foodsPerPage > 1
        ? Math.ceil(
            index % foodsPerPage == 0
              ? index / foodsPerPage + 1
              : index / foodsPerPage
          )
        : Math.ceil(index / foodsPerPage + 1);
    setPage((prev) => (new_page > 0 ? new_page : 1));
  }, [foodsPerPage]);

  const calculateMacros = (input_quantity: number, food: IGetFood | null) => {
    const carbs: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.carbs}`
      : `0`;
    const fat: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.fat}`
      : `0`;
    const protein: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.protein}`
      : `0`;
    const kcal: string = food
      ? `${(input_quantity / +food?.portion_size) * +food?.kcal}`
      : `0`;
    const macros = {
      carbs: parseFloat(carbs).toFixed(2),
      fat: parseFloat(fat).toFixed(2),
      protein: parseFloat(protein).toFixed(2),
      kcal: parseFloat(kcal).toFixed(2),
    };
    return macros;
  };
  return (
    <>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontFamily: "VT323" }}>
              ALIMENTOS POR PÁGINA:
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                variant="standard"
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={foodsPerPage}
                onChange={handleFoodsPerPage}
                autoWidth
                sx={{ fontFamily: "VT323", fontSize: 20 }}
              >
                <MenuItem style={{ fontFamily: "VT323" }} value={1}>
                  1
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={2}>
                  2
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={5}>
                  5
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={10}>
                  10
                </MenuItem>
                <MenuItem style={{ fontFamily: "VT323" }} value={15}>
                  15
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography
            sx={{ textAlign: "end", fontFamily: "VT323", fontSize: 18 }}
          >
            PÁGINA {page}
          </Typography>
        </Box>
        <Pagination
          sx={{ display: "flex", justifyContent: "flex-end" }}
          size="small"
          count={Math.ceil((sortedFreezer?.length as number) / foodsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
      {currentFoods ? (
        currentFoods.map((props) => {
          return (
            <div key={Math.random()}>
              <Divider />
              <Box
                sx={{
                  p: 1,
                  borderLeft: 3,
                  borderColor: "green",
                  marginBottom: 0.5,
                  marginTop: 0.5,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      ALIMENTO
                    </span>
                    : {props.food.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    component={"span"}
                    variant="h6"
                    fontFamily={"VT323"}
                    textTransform={"uppercase"}
                    display={props.food.brand ? "inherit" : "none"}
                  >
                    <span style={{ textDecoration: "underline dotted" }}>
                      MARCA
                    </span>
                    : {props.food.brand}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ fontSize: 18 }}
                >
                  <span style={{ textDecoration: "underline" }}>
                    DISPONIBILIDADE
                  </span>
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <span style={{ display: "flex", gap: 10 }}>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      PORÇÃO: {props.quantity} G /
                    </Typography>
                    <Typography
                      color="green"
                      variant="body2"
                      fontFamily={"VT323"}
                      fontSize={16}
                    >
                      {
                        calculateMacros(props.quantity as number, props.food)
                          .kcal
                      }
                      <span> KCAL</span>
                    </Typography>
                  </span>
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      component={"span"}
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>PROTEÍNAS</span>
                      <span>
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .protein
                        }
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>CARBOÍDRATOS</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .carbs
                        }{" "}
                        G
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily={"VT323"}
                      fontSize={16}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <span>GORDURA</span>
                      <span>
                        {" "}
                        {
                          calculateMacros(props.quantity as number, props.food)
                            .fat
                        }
                        G
                      </span>
                    </Typography>
                  </span>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 3,
                    }}
                  >
                    <EditNote />
                    <Delete />
                    <LocalDining />
                  </Box>
                </Box>
              </Box>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default MyFreezer;

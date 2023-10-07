import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { sortByPrice } from "../redux/reducers/productsReducer";
import { fetchAllCategoriesAsync } from "../redux/reducers/categorysReducer";
import { FilterBarProps } from "../types/components/FilterBarProps";
import { addErrorNotification } from "../redux/reducers/notificationReducer";
import { clearUserError } from "../redux/reducers/userReducer";

const FilterBar = (props: FilterBarProps) => {
  const { categories, error, loading } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(addErrorNotification(error));
      dispatch(clearUserError());
    }
  });

  const sortProducts = (dir: string) => {
    if (dir === "asc" || dir === "desc") {
      dispatch(sortByPrice(dir));
    }
  };

  return (
    <Grid container spacing={2} sx={{ pb: 4 }}>
      <Grid item xs={12} sm={12} md={4} xl={6}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="category-select-label">Filter by category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={props.categoryFilter}
            label="Filter by category"
            onChange={(e) => props.setCategoryFilter(e.target.value)}
          >
            {!loading &&
              categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="sort-label">Sort price</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value=""
            label="Sort price"
            onChange={(e) => sortProducts(e.target.value)}
          >
            <MenuItem value={"desc"}>desc</MenuItem>
            <MenuItem value={"asc"}>asc</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} xl={3}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="per-pages-select-label">Items per page</InputLabel>
          <Select
            labelId="per-pages-select-label"
            id="per-page-select"
            value={props.itemsPerPage}
            label="Items per page"
            onChange={(e) => props.setItemsPerPage(Number(e.target.value))}
          >
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>28</MenuItem>
            <MenuItem value={96}>96</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterBar;

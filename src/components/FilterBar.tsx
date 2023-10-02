import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import { Category } from "../types/Product/Category";
import useAppDispatch from "../hooks/useAppDispatch";
import { sortByPrice } from "../redux/reducers/productReducer";
import { FilterBarProps } from "../types/components/FilterBarProps";

const FilterBar = (props: FilterBarProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useAppDispatch();

  const fetchCategories = async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/categories"
    );
    const data: Category[] = response.data;
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {categories.map((c) => (
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

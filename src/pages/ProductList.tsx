// import { Product } from "../types/Product";

import { useEffect } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllProductsAsync } from "../redux/reducers/productReducer";
import { Box, Grid } from "@mui/material";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";

const ProductList = () => {
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(products);

  return (
    <Box>
      <Box>Image Banner</Box>
      <Pagination />
      <FilterBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item={true} key={p.id} xs={12} sm={6} md={4} xl={3}>
              <ProductItem key={p.id} product={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductList;

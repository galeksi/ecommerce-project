import { useEffect } from "react";
import { Box, CardMedia, Grid } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllProductsAsync } from "../redux/reducers/productReducer";
import ProductItem from "../components/ProductItem";
import PaginationBar from "../components/PaginationBar";
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
      <CardMedia
        component="img"
        height="600"
        image="/raul-gonzalez-escobar-ZpIskW1Tuvc-unsplash.jpg"
        alt="market"
      />
      <PaginationBar />
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

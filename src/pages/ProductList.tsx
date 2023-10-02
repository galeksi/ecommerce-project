import { useEffect, useState } from "react";
import { Box, CardMedia, Container, Grid } from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { fetchAllProductsAsync } from "../redux/reducers/productReducer";
import ProductItem from "../components/ProductItem";
import PaginationBar from "../components/PaginationBar";
import FilterBar from "../components/FilterBar";
import { paginationLoader } from "../utils/helpers";

const ProductList = () => {
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterByCategory = () => {
    return products.filter((p) => p.category.name === categoryFilter);
  };

  const allProducts = categoryFilter ? filterByCategory() : products;
  const productsToView = paginationLoader(allProducts, page, itemsPerPage);

  return (
    <Box>
      <CardMedia
        component="img"
        height="600"
        image="/raul-gonzalez-escobar-ZpIskW1Tuvc-unsplash.jpg"
        alt="market"
      />
      <Container>
        <PaginationBar
          page={page}
          count={productsToView.pageCount}
          setPage={setPage}
        />
        <FilterBar
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {productsToView.items.map((p) => (
              <Grid item key={p.id} xs={12} sm={6} md={4} xl={3}>
                <ProductItem key={p.id} product={p} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <PaginationBar
          page={page}
          count={productsToView.pageCount}
          setPage={setPage}
        />
      </Container>
    </Box>
  );
};

export default ProductList;

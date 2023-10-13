import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { ProductItemProps } from "../types/components/ProductItemProps";
import { Link } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { addCart } from "../redux/reducers/cartReducer";
import theme from "../theme";

const ProductItem = (props: ProductItemProps) => {
  const dispatch = useAppDispatch();
  const product = props.product;

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        size="large"
        aria-label="Add to Cart"
        onClick={() => dispatch(addCart(product))}
        color="inherit"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <AddShoppingCartIcon />
      </IconButton>
      <Link to={`/${product.id}`} style={{ textDecoration: "none" }}>
        <Card variant="outlined" sx={{ minHeight: 200 }}>
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]}
            alt="market"
          />
          <CardContent>
            <Typography variant="h6" sx={{ minHeight: 60 }}>
              {product.title}
            </Typography>
            <Typography variant="h5" textAlign="right" fontWeight="bold">
              {product.price} €
            </Typography>
            <Typography textAlign="right">incl. VAT</Typography>
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};

export default ProductItem;

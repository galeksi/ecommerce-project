import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { ProductItemProps } from "../types/components/ProductItemProps";

const ProductItem = (props: ProductItemProps) => {
  const product = props.product;

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
        <Typography sx={{ fontWeight: "bold" }} color="text.secondary">
          Price {product.price} €
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" href={`/${product.id}`} sx={{ mx: "auto" }}>
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import { ProductItemProps } from "../types/components/ProductItemProps";

const ProductItem = (props: ProductItemProps) => {
  const product = props.product;

  return (
    <Card variant="outlined" sx={{ minHeight: 200 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt="market"
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", minHeight: 80 }}>
          {product.title}
        </Typography>
        <Typography variant="h5">Price: {product.price} €</Typography>
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

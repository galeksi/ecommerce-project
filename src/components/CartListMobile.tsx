import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

const CartListMobile = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ width: "100%" }}>
      {cart &&
        cart.map((item) => (
          <Card variant="outlined" sx={{ mb: 2 }}>
            <Stack direction="row">
              <CardMedia
                component="img"
                style={{ height: 150, width: 150 }}
                image={item.product.images[0]}
                alt="market"
              />
              <Stack direction="row">
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", minHeight: 80 }}
                >
                  {item.product.title}
                </Typography>
                <Typography variant="h5">
                  Price: {item.product.price} €
                </Typography>
              </Stack>
            </Stack>
          </Card>
        ))}
    </Stack>
  );
};

export default CartListMobile;

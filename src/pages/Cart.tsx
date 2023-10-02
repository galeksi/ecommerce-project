import { Box, Container, Typography } from "@mui/material";
// import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  // const dispatch = useAppDispatch();

  return (
    <Container>
      <Typography variant="h2">Cart</Typography>
      {cart &&
        cart.map((i) => (
          <Box key={i.product.id}>
            <Typography>
              {i.product.title} - Amount: {i.amount} - {i.product.price}€ -
              Total: {i.amount * i.product.price}€
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

export default Cart;

import {
  Button,
  CardMedia,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import CartListDesktop from "../components/CartListDesktop";
import useAppSelector from "../hooks/useAppSelector";
import CartListMobile from "../components/CartListMobile";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);

  const isSmallScreen = useMediaQuery("(max-width: 749px)");

  const buttonStyle = {
    width: isSmallScreen ? "100%" : 400,
  };

  return (
    <>
      <CardMedia
        component="img"
        image="/assets/shopping-cart.jpg"
        alt="shopping-cart-image"
        style={{ height: "60vh", maxHeight: 600 }}
      />
      <Container>
        <Stack alignItems="center">
          <Typography variant="h2" sx={{ p: 5 }}>
            Your cart
          </Typography>
          {cart.length === 0 && (
            <Typography variant="h6" sx={{ pb: 3 }}>
              You have no Items in your cart yet.
            </Typography>
          )}
          {isSmallScreen ? <CartListMobile /> : <CartListDesktop />}
        </Stack>
        <Stack alignItems="end" sx={{ py: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            sx={buttonStyle}
            disabled={cart.length === 0}
          >
            Checkout
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Cart;

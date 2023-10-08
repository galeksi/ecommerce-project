import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { addCart, deleteCart, reduceCart } from "../redux/reducers/cartReducer";
import { invoiceTotal } from "../utils/invoiceTotal";

const CartListMobile = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  return (
    <Stack sx={{ width: "100%" }}>
      {cart &&
        cart.map((item) => (
          <Card key={item.product.id} variant="outlined" sx={{ mb: 2 }}>
            <Stack direction="row">
              <CardMedia
                component="img"
                sx={{ height: 150, width: 150, m: 2 }}
                image={item.product.images[0]}
                alt="market"
              />
              <Stack width="100%" sx={{ m: 2 }}>
                <Stack direction="row" sx={{ flexGrow: 1 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {item.product.title}
                    </Typography>
                    <Typography variant="h6">
                      {item.product.price} € incl. VAT
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="item-delete-button"
                      onClick={() => dispatch(deleteCart(item.product.id))}
                    >
                      <DeleteForeverOutlinedIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="start"
                  >
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="reduce-cart-item-button"
                      onClick={() => dispatch(reduceCart(item.product))}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Typography>{item.amount}</Typography>
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="add-cart-item-button"
                      onClick={() => dispatch(addCart(item.product))}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Stack>
                  <Typography variant="h5">
                    Sum: {item.amount * item.product.price} €
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        ))}
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 375, width: "100%", mt: 3 }}
          aria-label="simple table"
        >
          <TableBody>
            <TableRow>
              <TableCell align="right">VAT 24%</TableCell>
              <TableCell align="right" width="150">
                {(invoiceTotal(cart) * 0.24).toFixed(2)} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right" width="150">
                <Typography fontWeight="bold">
                  {invoiceTotal(cart)} €
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default CartListMobile;

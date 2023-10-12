import { Link } from "react-router-dom";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardMedia,
  Stack,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { reduceCart, addCart, deleteCart } from "../redux/reducers/cartReducer";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { invoiceTotal } from "../utils/invoiceTotal";

const CartListDesktop = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 375, width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Remove</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart &&
            cart.map((item) => (
              <TableRow
                key={item.product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <CardMedia
                    component="img"
                    image={item.product.images[0]}
                    alt={`${item.product.title}-image`}
                    style={{ height: 100, width: 100 }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Link to={`/${item.product.id}`} style={{ color: "inherit" }}>
                    {item.product.title}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="reduce-cart-item-button"
                      disabled={item.amount <= 1 ? true : false}
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
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="large"
                    color="inherit"
                    aria-label="item-delete-button"
                    onClick={() => dispatch(deleteCart(item.product.id))}
                  >
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">{item.product.price} €</TableCell>
                <TableCell align="center">
                  <Typography>{item.amount * item.product.price} €</Typography>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell rowSpan={2} />
            <TableCell rowSpan={2} />
            <TableCell rowSpan={2} />
            <TableCell>VAT</TableCell>
            <TableCell align="right">24 %</TableCell>
            <TableCell align="center">
              {(invoiceTotal(cart) * 0.24).toFixed(2)} €
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="center">
              <Typography fontWeight="bold">{invoiceTotal(cart)} €</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartListDesktop;

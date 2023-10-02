import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";

const Header = () => {
  const cart = useAppSelector((state) => state.cartReducer);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <StoreOutlinedIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kwik-E-Mart
          </Typography>
          <Button color="inherit">Login</Button>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

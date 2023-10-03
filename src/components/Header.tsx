import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import HideOnScroll from "./HideOnScroll";

const Header = () => {
  const cart = useAppSelector((state) => state.cartReducer);

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home-button-icon"
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
    </HideOnScroll>
  );
};

export default Header;

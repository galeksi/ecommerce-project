import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
} from "@mui/material";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import useAppSelector from "../hooks/useAppSelector";
import HideOnScroll from "./HideOnScroll";
import LoginModal from "./LoginModal";
import UserHeaderMenu from "./UserHeaderMenu";

const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const cart = useAppSelector((state) => state.cartReducer);
  const { currentUser } = useAppSelector((state) => state.userReducer);

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

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
          {currentUser ? (
            <UserHeaderMenu />
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLoginOpen}
              sx={{ mr: 3 }}
            >
              Login
            </Button>
          )}
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </Link>
        </Toolbar>
        <LoginModal open={isLoginModalOpen} onClose={handleLoginClose} />
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;

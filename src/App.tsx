import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import { authenticateUserAsync } from "./redux/reducers/userReducer";
import { addErrorNotification } from "./redux/reducers/notificationReducer";
import useAppSelector from "./hooks/useAppSelector";
import useAppDispatch from "./hooks/useAppDispatch";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userReducer);
  const { message, error } = useAppSelector(
    (state) => state.notificationReducer
  );

  const checkUser = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      await dispatch(authenticateUserAsync(token));
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user.error) {
      dispatch(addErrorNotification(user.error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.error]);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Box sx={{ alignItems: "flex-start", my: 7 }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
      {message && <Notification message={message} error={error} />}
      <Footer />
    </Stack>
  );
};

export default App;

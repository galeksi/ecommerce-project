import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import useAppDispatch from "./hooks/useAppDispatch";
import { authenticateUserAsync } from "./redux/reducers/userReducer";
import { AxiosError } from "axios";
import Notification from "./components/Notification";
import useAppSelector from "./hooks/useAppSelector";

const App = () => {
  const dispatch = useAppDispatch();
  const { message, error } = useAppSelector(
    (state) => state.notificationReducer
  );

  const checkUser = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        await dispatch(authenticateUserAsync(token));
      } catch (error) {
        const newError = error as AxiosError;
        console.log(newError.message);
      }
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Box sx={{ alignItems: "flex-start", mt: 7 }}>
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

import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import Register from "./pages/Register";
import { Box, Stack } from "@mui/material";

const App = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Header />
      <Box sx={{ alignItems: "flex-start" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path=":id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
      <Footer />
    </Stack>
  );
};

export default App;

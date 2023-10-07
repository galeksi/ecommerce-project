import { Container, Stack, Typography } from "@mui/material";

import AddProductForm from "./AddProductForm";
import AdminUserList from "./AdminUserList";
import UpdateProductList from "./UpdateProductList";

const AdminPanel = () => {
  return (
    <Container sx={{ mt: 10 }}>
      <Stack>
        <Typography textAlign="center" variant="h3">
          Admin panel
        </Typography>
        <Typography variant="h4" sx={{ my: 2 }}>
          Add new product:
        </Typography>
        <AddProductForm />
        <UpdateProductList />
        <Typography variant="h4" sx={{ my: 2 }}>
          Users:
        </Typography>
        <AdminUserList />
      </Stack>
    </Container>
  );
};

export default AdminPanel;

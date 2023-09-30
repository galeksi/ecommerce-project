import { Box, Typography } from "@mui/material";
import AdminPanel from "../components/AdminPanel";

const ProfilePage = () => {
  return (
    <Box>
      <Box>
        <Typography>Hello customer</Typography>
      </Box>
      <AdminPanel />
    </Box>
  );
};

export default ProfilePage;

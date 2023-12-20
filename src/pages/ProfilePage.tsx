import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import AdminPanel from "../components/AdminPanel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
  const { currentUser, loading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const adminPanel =
    currentUser && currentUser.user.role === "Admin" ? <AdminPanel /> : <></>;

  return (
    <Container sx={{ mt: 10, px: 5 }}>
      {loading && (
        <Box sx={{ m: 3 }}>
          <div className="loader"></div>
        </Box>
      )}
      {currentUser && (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={currentUser.user.avatar}
              alt={`${currentUser.user.name} avatar`}
              sx={{ height: 300, width: 300, borderRadius: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h2">
                Hello,
                <br />
                {currentUser.user.name}
              </Typography>
              <Typography variant="h5" sx={{ mt: 3 }}>
                Your email: {currentUser.user.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
      {adminPanel}
    </Container>
  );
};

export default ProfilePage;

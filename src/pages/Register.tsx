import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

import { UserRegister } from "../types/User/UserRegister";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  clearUserError,
  clearUserSuccess,
  registerUserAsync,
} from "../redux/reducers/userReducer";
import {
  addErrorNotification,
  addNotification,
} from "../redux/reducers/notificationReducer";
import useAppSelector from "../hooks/useAppSelector";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { success, error } = useAppSelector((state) => state.userReducer);
  const [formData, setFormData] = useState<UserRegister>({
    email: "",
    password: "",
    name: "",
    avatar:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  });

  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(addNotification(success));
      dispatch(clearUserSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (error) {
      dispatch(addErrorNotification(error));
      dispatch(clearUserError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(registerUserAsync(formData));
  };

  return (
    <Container sx={{ maxWidth: 600, mt: 5 }}>
      <Typography variant="h2">Register</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              helperText={
                formData.password === confirmPassword
                  ? ""
                  : "Passwords don't match"
              }
              error={!(formData.password === confirmPassword)}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              disabled={!(formData.password === confirmPassword)}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;

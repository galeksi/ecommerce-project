import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

import { UserRegister } from "../types/User/UserRegister";
import useAppDispatch from "../hooks/useAppDispatch";
import { registerUserAsync } from "../redux/reducers/userReducer";
import { AxiosError } from "axios";
import {
  addErrorNotification,
  addNotification,
} from "../redux/reducers/notificationReducer";

const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formData, setFormData] = useState<UserRegister>({
    email: "",
    password: "",
    name: "",
    role: "customer",
    avatar:
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await dispatch(registerUserAsync(formData));
      navigate("/");
      dispatch(addNotification(`Welcome ${formData.name}!`));
    } catch (error) {
      const newError = error as AxiosError;
      dispatch(addErrorNotification(newError.message));
    }
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

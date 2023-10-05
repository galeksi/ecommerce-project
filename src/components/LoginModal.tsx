import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";

import { LoginModalProps } from "../types/components/LoginModalProps";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { AxiosError } from "axios";
import { loginUserAsync } from "../redux/reducers/userReducer";

const LoginModal = (props: LoginModalProps) => {
  const { open, onClose } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUserAsync({ email, password }));
      navigate("/profile");
      onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      const newError = error as AxiosError;
      console.log(newError.message);
      setEmail("");
      setPassword("");
    }
  };

  const handleRegisterButton = () => {
    onClose();
    navigate("/register");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Login
        <Button onClick={onClose}>Cancel</Button>
      </DialogTitle>

      <DialogContent>
        <TextField
          required
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ my: 2 }}
        />
        <TextField
          required
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <Stack sx={{ mx: 3 }}>
        <Button
          variant="contained"
          onClick={handleLogin}
          color="primary"
          sx={{ width: "100%" }}
        >
          Login
        </Button>
        <Button
          onClick={handleRegisterButton}
          color="primary"
          sx={{ width: "100%", my: 1 }}
        >
          Register
        </Button>
      </Stack>
    </Dialog>
  );
};

export default LoginModal;

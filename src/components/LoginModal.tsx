import { useEffect, useState } from "react";
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
import {
  clearUserError,
  loginUserAsync,
  clearUserSuccess,
} from "../redux/reducers/userReducer";
import {
  addErrorNotification,
  addNotification,
} from "../redux/reducers/notificationReducer";
import useAppSelector from "../hooks/useAppSelector";

const LoginModal = (props: LoginModalProps) => {
  const { open, onClose } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { success, error } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (success) {
      onClose();
      setEmail("");
      setPassword("");
      navigate("/profile");
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

  const handleLogin = async () => {
    await dispatch(loginUserAsync({ email, password }));
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

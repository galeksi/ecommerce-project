import { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  addErrorNotification,
  addNotification,
} from "../redux/reducers/notificationReducer";
import {
  fetchAllUsersAsync,
  clearUserError,
  deleteUserAsync,
  clearUserSuccess,
} from "../redux/reducers/userReducer";

const AdminUserList = () => {
  const [userFilter, setUserFilter] = useState<string>("");
  const { currentUser, users, error, loading, success } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchAllUsersAsync(currentUser.token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success) {
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

  const deleteUser = async (id: string, name: string) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      await dispatch(deleteUserAsync(id));
    }
  };

  const usersToShow = !userFilter
    ? users
    : users.filter((u) => u.email.includes(userFilter));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ mt: 5, mb: 2, pr: 2 }}>
          Users:
        </Typography>
        <TextField
          label="Search by email"
          name="userFilter"
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 375, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              usersToShow.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="left">
                    {user.role === "Admin" ? (
                      <AdminPanelSettingsOutlinedIcon />
                    ) : (
                      <SupervisorAccountOutlinedIcon />
                    )}
                  </TableCell>
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="item-delete-button"
                      onClick={() => deleteUser(user.id, user.name)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {loading && (
          <Box sx={{ m: 3 }}>
            <div className="loader"></div>
          </Box>
        )}
      </TableContainer>
    </>
  );
};

export default AdminUserList;

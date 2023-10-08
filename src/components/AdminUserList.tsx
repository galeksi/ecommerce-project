import { useEffect } from "react";
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
  const { users, error, loading, success } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
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

  const deleteUser = async (id: number, name: string) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      await dispatch(deleteUserAsync(id));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 375, width: "100%", mt: 3 }}
        aria-label="simple table"
      >
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
            users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="left">
                  {user.role === "admin" ? (
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
  );
};

export default AdminUserList;

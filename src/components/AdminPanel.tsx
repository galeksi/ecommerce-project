import { useEffect } from "react";
import { AxiosError } from "axios";
import {
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  deleteUserAsync,
  fetchAllUsersAsync,
} from "../redux/reducers/userReducer";

const AdminPanel = () => {
  const { users } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUser = async (id: number, name: string) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      try {
        await dispatch(deleteUserAsync(id));
      } catch (error) {
        const newError = error as AxiosError;
        console.log(newError.message);
      }
    }
  };

  return (
    <Container sx={{ mt: 10, px: 5 }}>
      <Stack>
        <Typography textAlign="center" variant="h3">
          Admin panel
        </Typography>
        <Typography variant="h4">Users</Typography>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 375, width: "100%", mt: 3 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Role</TableCell>
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
                    <TableCell align="left">{user.name}</TableCell>
                    <TableCell align="left">{user.role}</TableCell>
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
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default AdminPanel;

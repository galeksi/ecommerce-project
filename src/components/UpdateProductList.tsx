import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  clearProductError,
  deleteProductAsync,
  fetchAllProductsAsync,
} from "../redux/reducers/productsReducer";
import { addErrorNotification } from "../redux/reducers/notificationReducer";
import UpdateProductForm from "./UpdateProductForm";
import { ShowUpdateFormState } from "../types/components/ShowUpdateProductFormState";

const UpdateProductList = () => {
  const dispatch = useAppDispatch();
  const { products, error } = useAppSelector((state) => state.productsReducer);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [showUpdateForm, setShowUpdateForm] = useState<ShowUpdateFormState>({});

  useEffect(() => {
    dispatch(fetchAllProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      dispatch(addErrorNotification(error));
      dispatch(clearProductError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const deleteProduct = async (id: number, title: string) => {
    if (window.confirm(`Do you want to delete ${title}?`)) {
      await dispatch(deleteProductAsync(id));
    }
  };

  const handleUpdateClick = (productId: number) => {
    setShowUpdateForm((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const productsToShow = !titleFilter
    ? []
    : products.filter((p) =>
        p.title.toLowerCase().includes(titleFilter.toLowerCase())
      );

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ my: 2, pr: 2 }}>
          Update product:
        </Typography>
        <TextField
          label="Search by title"
          name="titleFilter"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table sx={{ minWidth: 375, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsToShow &&
              productsToShow.map((product) => (
                <React.Fragment key={product.id}>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.id}
                    </TableCell>
                    <TableCell align="left">{product.title}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        color="inherit"
                        aria-label="item-updatebutton"
                        onClick={() => handleUpdateClick(product.id)}
                      >
                        <SettingsOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="large"
                        color="inherit"
                        aria-label="item-delete-button"
                        onClick={() => deleteProduct(product.id, product.title)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {showUpdateForm[product.id] && (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <UpdateProductForm
                          product={product}
                          onClose={() => handleUpdateClick(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UpdateProductList;
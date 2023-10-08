import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

import { UpdateProductFormProps } from "../types/components/UpdateProductFormProps";
import useAppSelector from "../hooks/useAppSelector";
import { ProductUpdate } from "../types/Product/ProductUpdate";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  clearProductError,
  clearProductSuccess,
  updateProductAsync,
} from "../redux/reducers/productsReducer";
import {
  addErrorNotification,
  addNotification,
} from "../redux/reducers/notificationReducer";

const UpdateProductForm = (props: UpdateProductFormProps) => {
  const { product, onClose } = props;
  const { error, success } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (success) {
      dispatch(addNotification(success));
      dispatch(clearProductSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect(() => {
    if (error) {
      dispatch(addErrorNotification(error));
      dispatch(clearProductError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productUpdate: ProductUpdate = { id: product.id };
    if (title) {
      productUpdate.title = title;
    }
    if (price) {
      productUpdate.price = Number(price);
    }
    if (image) {
      productUpdate.images = [image];
    }
    if (category) {
      productUpdate.categoryId = Number(category);
    }
    if (description) {
      productUpdate.description = description;
    }

    await dispatch(updateProductAsync(productUpdate));

    setTitle("");
    setPrice("");
    setImage("");
    setCategory("");
    setDescription("");
  };

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ py: 2 }}>{product.title}</Typography>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ py: 2 }}>{product.price}</Typography>
            <TextField
              required
              fullWidth
              type="number"
              label="Price in EUR"
              name="price"
              value={price}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: "0.01",
                },
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ py: 2 }}>Add image:</Typography>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography sx={{ py: 2 }}>{product.category.name}</Typography>
            <TextField
              select
              required
              fullWidth
              label="Category"
              name="categoryId"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ py: 2 }}>{product.description}</Typography>
            <TextField
              required
              multiline
              rows={5}
              fullWidth
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Update
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClose()}
              sx={{ width: "100%" }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProductForm;

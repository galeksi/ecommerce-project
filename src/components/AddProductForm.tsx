import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import { NewProduct } from "../types/Product/NewProduct";
import useAppDispatch from "../hooks/useAppDispatch";
import { addProductAsync } from "../redux/reducers/productsReducer";
import {
  addNotification,
  addErrorNotification,
} from "../redux/reducers/notificationReducer";
import { clearUserError } from "../redux/reducers/userReducer";

const initialFormData = {
  title: "",
  price: 0,
  description: "",
  categoryId: 1,
  images: [""],
};

const AddProductForm = () => {
  const dispatch = useAppDispatch();
  const { products, error } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const [formData, setFormData] = useState<NewProduct>(initialFormData);

  useEffect(() => {
    if (
      products &&
      formData.title &&
      products[products.length - 1].title === formData.title
    ) {
      dispatch(addNotification(`Product: ${formData.title} added!`));
      setFormData(initialFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    if (error) {
      dispatch(addErrorNotification(error));
      dispatch(clearUserError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "images") {
      setFormData({
        ...formData,
        images: [value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    await dispatch(addProductAsync(formData));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Price in EUR"
              name="price"
              value={formData.price}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: "0.01",
                },
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Image"
              name="images"
              value={formData.images[0]}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              label="Category"
              name="categoryId"
              value={Number(formData.categoryId)}
              onChange={handleChange}
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
            <TextField
              required
              multiline
              rows={5}
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddProductForm;

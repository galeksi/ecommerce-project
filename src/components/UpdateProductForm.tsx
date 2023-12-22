import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Typography,
  Stack,
  IconButton,
  CardMedia,
  Input,
  InputLabel,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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
import theme from "../theme";
import axios, { AxiosError } from "axios";
import { Image } from "../types/Image/Image";
import { baseUrl } from "../redux/shared/baserUrl";

const UpdateProductForm = (props: UpdateProductFormProps) => {
  const { product, onClose } = props;
  const { token } = useAppSelector((state) => state.userReducer);
  const { error, success } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [allImages, setAllImages] = useState<Image[]>([]);

  useEffect(() => {
    if (product) {
      setAllImages(product.images.map((i) => i));
      setTitle(product.title);
      setPrice(product.price.toString());
      setCategory(product.category.id.toString());
      setDescription(product.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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
    if (category) {
      productUpdate.categoryId = category;
    }
    if (description) {
      productUpdate.description = description;
    }

    await dispatch(updateProductAsync({ token, data: productUpdate }));

    setTitle("");
    setPrice("");
    setCategory("");
    setDescription("");
  };

  const removeImage = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedImages = allImages.filter((i) => i.id !== id);
      setAllImages(updatedImages);
    } catch (e) {
      const error = e as AxiosError;
      dispatch(addErrorNotification(error.message));
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const newImage: Image = await axios.post(
          `${baseUrl}/images`,
          { url: response.data.location, productId: product.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllImages((prevArray) => [...prevArray, newImage]);
      } catch (e) {
        const error = e as AxiosError;
        dispatch(addErrorNotification(error.message));
      }
    } else {
      dispatch(addErrorNotification("Incorrect file added"));
    }
  };

  return (
    <Box sx={{ mb: 3, width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ py: 2 }}>{product.title}</Typography>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography sx={{ py: 2 }}>{product.price}</Typography>
            <TextField
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
          <Grid item xs={12} sm={4}>
            <Typography sx={{ py: 2 }}>{product.category.name}</Typography>
            <TextField
              select
              fullWidth
              label="Category"
              name="category"
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
              multiline
              rows={5}
              fullWidth
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row">
              <InputLabel htmlFor="update-file-upload">
                <Input
                  id="update-file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  variant="outlined"
                  component="label"
                  htmlFor="update-file-upload"
                  startIcon={<CloudUploadOutlinedIcon />}
                >
                  Upload Image
                </Button>
              </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" sx={{ my: 2 }}>
              {allImages &&
                allImages.map((image) => (
                  <Box key={image.id} sx={{ position: "relative" }}>
                    <IconButton
                      size="small"
                      aria-label="Remove image"
                      onClick={() => removeImage(image.id)}
                      color="inherit"
                      sx={{
                        position: "absolute",
                        top: -5,
                        right: 5,
                        backgroundColor: theme.palette.primary.main,
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <CancelOutlinedIcon />
                    </IconButton>
                    <CardMedia
                      component="img"
                      image={image.url}
                      alt="image URL"
                      sx={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                        marginRight: 2,
                      }}
                    />
                  </Box>
                ))}
            </Stack>
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

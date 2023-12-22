import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Stack,
  CardMedia,
  Input,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import useAppSelector from "../hooks/useAppSelector";
import { NewProduct } from "../types/Product/NewProduct";
import useAppDispatch from "../hooks/useAppDispatch";
import {
  addProductAsync,
  clearProductSuccess,
} from "../redux/reducers/productsReducer";
import {
  addNotification,
  addErrorNotification,
} from "../redux/reducers/notificationReducer";
import { clearUserError } from "../redux/reducers/userReducer";
import axios, { AxiosError } from "axios";
import theme from "../theme";
import { Image } from "../types/Image/Image";

const initialFormData = {
  title: "",
  price: 0,
  description: "",
  categoryId: "",
  inventory: 0,
  images: [],
};

const AddProductForm = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userReducer);
  const { success, error } = useAppSelector((state) => state.productsReducer);
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const [formData, setFormData] = useState<NewProduct>(initialFormData);
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    if (success) {
      dispatch(addNotification(success));
      dispatch(clearProductSuccess());
      setFormData(initialFormData);
      setAllImages([]);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const removeImage = (url: string) => {
    const updatedImages = allImages.filter((i) => i !== url);
    setAllImages(updatedImages);
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

        setAllImages((prevArray) => [...prevArray, response.data.location]);
      } catch (e) {
        const error = e as AxiosError;
        dispatch(addErrorNotification(error.message));
      }
    } else {
      dispatch(addErrorNotification("Incorrect file added"));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const completeFormData = { ...formData, images: allImages };
      await dispatch(addProductAsync({ data: completeFormData, token }));
    } catch (e) {
      const error = e as AxiosError;
      dispatch(addErrorNotification(error.message));
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <TextField
              select
              required
              fullWidth
              label="Category"
              name="categoryId"
              value={formData.categoryId}
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
            <Stack direction="row">
              <InputLabel htmlFor="file-upload">
                <Input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Button
                  variant="outlined"
                  component="label"
                  htmlFor="file-upload"
                  startIcon={<CloudUploadOutlinedIcon />}
                >
                  Upload File
                </Button>
              </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" sx={{ my: 2 }}>
              {allImages &&
                allImages.map((image, index) => (
                  <Box key={index} sx={{ position: "relative" }}>
                    <IconButton
                      size="small"
                      aria-label="Remove image"
                      onClick={() => removeImage(image)}
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
                      image={image}
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

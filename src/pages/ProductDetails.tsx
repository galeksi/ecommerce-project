import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { Product } from "../types/Product/Product";
import useAppDispatch from "../hooks/useAppDispatch";
import { addCart } from "../redux/reducers/cartReducer";
import { addErrorNotification } from "../redux/reducers/notificationReducer";
import { baseUrl } from "../redux/shared/baserUrl";

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | undefined>();
  const [imageIndex, setImageIndex] = useState<number>(0);
  const id = useParams().id;
  const dispatch = useAppDispatch();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products/${id}`);
      const data: Product = response.data;
      setProduct(data);
    } catch (e) {
      const newError = e as AxiosError;
      dispatch(addErrorNotification(newError.message));
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {product && (
        <Container sx={{ pt: 10 }}>
          <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
            <Typography sx={{ fontSize: 24, pb: 3, mt: 0 }}>
              <ArrowBackOutlinedIcon sx={{ fontSize: 48 }} />
            </Typography>
          </Link>
          <Grid container spacing={5}>
            <Grid item sm={12} md={6}>
              <Stack>
                <CardMedia
                  component="img"
                  height="500"
                  image={`https://res.cloudinary.com/galeksi/image/upload/v1/ecom_fullstack/${product.images[imageIndex].url}`}
                  alt="large product image"
                />
                <Stack direction="row">
                  {product.images.length > 1 &&
                    product.images.map((image, index) => (
                      <Box
                        key={index}
                        onClick={() => setImageIndex(index)}
                        sx={{ cursor: "pointer" }}
                      >
                        <CardMedia
                          component="img"
                          height="100"
                          image={`https://res.cloudinary.com/galeksi/image/upload/v1/ecom_fullstack/${image.url}`}
                          alt="small product image"
                          sx={{ mt: 2, mr: 2, width: 100 }}
                        />
                      </Box>
                    ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box>
                <Typography variant="h1" sx={{ fontSize: 48 }}>
                  {product.title}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontSize: 34, fontWeight: "bold", pt: 5 }}
                >
                  {product.price} €
                </Typography>
                <Typography>incl. VAT</Typography>
                <Typography variant="subtitle1" sx={{ py: 5 }}>
                  {product.description}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "100%" }}
                  onClick={() => dispatch(addCart(product))}
                >
                  Addt to cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductDetails;

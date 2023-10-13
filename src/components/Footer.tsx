import { Box, Container, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import theme from "../theme";
import { Link } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Box
      sx={{
        p: 3,
        marginTop: "auto",
        backgroundColor: theme.palette.secondary.light,
      }}
      component="footer"
    >
      <Container>
        <Typography variant="h5" sx={{ mb: 3 }}>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            Products
          </Link>{" "}
          |{" "}
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Register
          </Link>
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">
            {"Copyright © "}
            HOMESHOP
            {new Date().getFullYear()}
          </Typography>
          <Stack direction="row">
            <FontAwesomeIcon
              icon={faInstagram}
              size="xl"
              style={{ marginLeft: "1rem" }}
            />
            <FontAwesomeIcon
              icon={faFacebook}
              size="xl"
              style={{ marginLeft: "1rem" }}
            />
            <FontAwesomeIcon
              icon={faTiktok}
              size="xl"
              style={{ marginLeft: "1rem" }}
            />
            <FontAwesomeIcon
              icon={faTwitter}
              size="xl"
              style={{ marginLeft: "1rem" }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

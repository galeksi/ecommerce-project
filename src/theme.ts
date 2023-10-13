import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#35E9D1",
      light: "#6CEFDD",
      dark: "#16CAB2",
      contrastText: "#0C0F0A",
    },
    secondary: {
      main: "#FBFF12",
      light: "#FDFF99",
      dark: "#DDE000",
      contrastText: "#0C0F0A",
    },
    error: {
      main: "#FF206E",
      light: "#FF4788",
      dark: "#1565c0",
      contrastText: "#0C0F0A",
    },
    warning: {
      main: "#FFA000",
      light: "#42a5f5",
      dark: "#1565c0",
      contrastText: "#0C0F0A",
    },
    info: {
      main: "#A3F5EA",
      light: "#B6F7EE",
      dark: "#91F3E6",
      contrastText: "#0C0F0A",
    },
    success: {
      main: "#FBFF12",
      light: "#FDFF70",
      dark: "#DDE000",
      contrastText: "#0C0F0A",
    },
  },
  typography: {
    fontFamily: "Quicksand, serif",
    h2: {
      fontFamily: "Bebas Neue, sans-serif",
    },
  },
});

export default theme;

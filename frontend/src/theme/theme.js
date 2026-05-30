import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E293B",
    },
    secondary: {
      main: "#F59E0B",
    },
    success: {
      main: "#22C55E",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8FAFC",
    },
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  shape: {
    borderRadius: 12,
  },
});

export default theme;

import { deepOrange, brown, deepPurple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import themeTypography from "./typography";

// A custom theme for this app
let theme = createTheme({
  palette: {
    secondary: deepOrange,
    primary: {
      main: "#007b7d",
    },
    text: brown,
    grey: brown,
    background: {
      paper: "#fffaf0",
      default: "#fcedd8",
    },
  },
});

theme = createTheme(theme, { typography: themeTypography(theme) });

export default theme;

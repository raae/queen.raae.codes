import { deepOrange, brown, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: yellow,
    text: brown,
    grey: brown,
    background: {
      paper: "#fffaf0",
      default: "#fcedd8",
    },
  },
  typography: {},
});

export default theme;

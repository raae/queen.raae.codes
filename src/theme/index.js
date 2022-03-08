import { brown, deepOrange, pink, amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import themeForm from "./form";
import themeList from "./list";
import themeTypography from "./typography";

// A custom theme for this app
let theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontWeightRegular: 500,
    fontWeightExtraBold: 900,
  },
  palette: {
    brand: deepOrange,
    secondary: amber,
    primary: {
      main: "#007b7d",
    },
  },
  shape: {
    borderRadius: 2,
  },
});

theme = createTheme(theme, {
  palette: {
    text: {
      primary: brown[900],
      secondary: theme.palette.primary.dark,
      disabled: brown[200],
    },
    grey: pink,
    background: {
      paper: "#fffaf0",
      default: "#fcedd8",
    },
  },
});

theme = createTheme(theme, { typography: themeTypography(theme) });
theme = createTheme(theme, { components: themeList(theme) });
theme = createTheme(theme, { components: themeForm(theme) });

export default theme;

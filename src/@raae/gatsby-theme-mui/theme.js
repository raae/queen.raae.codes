import { brown, deepOrange, amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import themeForm from "./form";
import themeList from "./list";
import themeAppBar from "./app-bar";
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
    background: {
      paper: "#fffaf0",
      default: "#fcedd8",
    },
  },
  shape: {
    borderRadius: 2,
  },
});

const options = {
  palette: {
    text: {
      primary: brown[900],
      secondary: theme.palette.primary.dark,
      disabled: brown[200],
    },
  },
  typography: themeTypography(theme),
  components: {
    ...themeAppBar(theme),
    ...themeList(theme),
    ...themeForm(theme),
  },
};

theme = createTheme(theme, options);

export default theme;

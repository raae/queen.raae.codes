const themeForm = (theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: theme.typography.fontWeightBold,
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          borderWidth: "2px !important",
        },
        fullWidth: {
          justifyContent: "space-between",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  };
};

export default themeForm;

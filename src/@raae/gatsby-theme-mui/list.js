const themeList = (theme) => {
  return {
    MuiListItem: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiListItemText: {
      defaultProps: {
        secondaryTypographyProps: {
          variant: "overline",
          gutterBottom: true,
        },
        primaryTypographyProps: {
          variant: "h5",
          gutterBottom: true,
        },
      },
      styleOverrides: {
        root: {
          maxWidth: "48ch",
          display: "flex",
          flexDirection: "column-reverse",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          ".MuiListItemText-primary": {
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
        },
      },
    },
  };
};

export default themeList;

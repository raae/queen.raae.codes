const themeAppBar = (theme) => {
  return {
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        elevation: 0,
        border: true,
      },
      styleOverrides: {
        colorTransparent: {
          backgroundColor: "#fffaf0b3",
          backdropFilter: "blur(20px)",
        },
      },
    },
  };
};

export default themeAppBar;

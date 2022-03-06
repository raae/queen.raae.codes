const themeTypography = (theme) => {
  return {
    h6: {
      fontSize: "0.875rem",
      fontWeight: theme.typography.fontWeightBold,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: theme.typography.fontWeightBold,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: theme.typography.fontWeightBold,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: theme.typography.fontWeightBold,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: theme.typography.fontWeightExtraBold,
    },
    h1: {
      letterSpacing: "-0.025em",
      lineHeight: 1,
      fontSize: "2.75rem",
      fontWeight: theme.typography.fontWeightExtraBold,
    },
    subtitle1: {
      fontSize: "1.25rem",
      lineHeight: 1.35,
      fontWeight: theme.typography.fontWeightBold,
    },
    subtitle2: {
      fontSize: "1.25rem",
      lineHeight: 1.35,
      fontWeight: theme.typography.fontWeightMedium,
    },
    overline: {
      lineHeight: 1.35,
    },
    // caption: {
    //   fontSize: "0.75rem",
    //   fontWeight: 400,
    // },
    // body1: {
    //   fontSize: "0.875rem",
    //   fontWeight: 400,
    //   lineHeight: "1.334em",
    // },
    // body2: {
    //   letterSpacing: "0em",
    //   fontWeight: 400,
    //   lineHeight: "1.5em",
    // },
  };
};

export default themeTypography;

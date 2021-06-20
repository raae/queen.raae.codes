const theme = {
  colors: {
    text: "#3d3c31",
    textDark: "#000c22",
    textLight: "#6e6c5d",
    background: "#ffffff",
    primary: "#42b598",
    primaryDark: "#007b7d",
    secondary: "#ec4326",
    tertiary: "#f2a220",
    brown: "#55392f",
    floralWhite: "#F9D6AC",
    shades: {
      section: "#fefaf4",
      code: "#f4f0ea",
      hero: "#fcedd8",
    },
  },

  fonts: {
    body: "FuturaPTBook",
    heading: "FuturaPTBold",
    highlight: "ShrikhandRegular",
    monospace: "monospace",
  },

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  fontSizes: [
    ".75rem",
    ".875rem",
    "1.03rem",
    "1.2rem",
    "1.6rem",
    "2.2rem",
    "2.8rem",
    "3.6rem",
  ],

  lineHeights: {
    body: 1.5,
    heading: 1.25,
    list: 2,
  },

  radii: [0, 20],

  sizes: {
    container: 800,
  },

  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      fontSize: 2,
    },
    code: {
      borderRadius: 1,
      px: 2,
      color: "secondary",
      fontSize: "90%",
      backgroundColor: "shades.code",
    },
    hr: {
      color: "shades.section",
      my: 3,
    },
    a: {
      color: "primary",
    },
  },

  text: {
    default: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      fontSize: 2,
    },
    heading: {
      h1: {
        fontSize: [7],
      },
      h2: {
        fontSize: [4, 6],
      },
      h3: {
        variant: "text.default",
        lineHeight: "heading",
        fontSize: [3, 4],
      },
      h4: {
        fontSize: [3, 4],
      },
      h5: {
        fontSize: [2, 3],
      },
      h6: {
        variant: "text.default",
        lineHeight: "heading",
        fontSize: [2],
      },
    },
    dt: {
      alignItems: "center",
      display: "flex",
      fontFamily: "heading",
      lineHeight: "list",
      fontWeight: "heading",
      fontSize: [2, 3],
      svg: {
        fill: "tertiary",
        mr: 2,
      },
    },
    dd: {
      variant: "text.default",
      mb: 4,
    },
  },

  buttons: {
    default: {
      cursor: "pointer",
      transition: ".2s linear opacity",
    },
    primary: {
      variant: "buttons.default",
      backgroundColor: "secondary",
    },
    secondary: {
      variant: "buttons.default",
      backgroundColor: "primary",
    },
  },

  layout: {
    container: {
      px: [3, 4],
    },
  },

  links: {
    variant: "styles.a",
  },
}

export default theme

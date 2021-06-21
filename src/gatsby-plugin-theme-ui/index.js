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
    grey: "#999999",
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
    "1.04rem",
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
    a: {
      color: "primary",
    },
    h1: {
      fontSize: [7],
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "heading",
      fontSize: [4, 6],
      marginTop: 3,
      marginBottom: 3,
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [4, 5],
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [3, 4],
    },
    h5: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "heading",
      fontSize: [2, 3],
    },
    h6: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "heading",
      fontSize: [2],
    },
    p: {
      fontSize: 3,
      margin: "0.5em 0",
      "&.intro": {
        fontSize: 4,
      },
    },
    em: {
      color: "secondary",
      fontSize: "85%",
      fontFamily: "highlight",
      ":nth-of-type(2n)": {
        color: "primary",
      },
    },
    strong: {
      fontWeight: "bold",
    },
    hr: {
      borderStyle: "none",
      marginTop: 5,
      marginBottom: 0,
    },
    dt: {
      alignItems: "center",
      display: "flex",
      fontFamily: "heading",
      lineHeight: "list",
      fontWeight: "heading",
      fontSize: [3, 4],
      svg: {
        fill: "tertiary",
        mr: 2,
      },
    },
    dd: {
      margin: 0,
      mb: 4,
      fontSize: 3,
      p: {
        margin: "0.25em 0",
        maxWidth: ["100%", "70%"],
      },
    },
  },

  buttons: {
    default: {
      cursor: "pointer",
      transition: ".2s linear opacity",
      ":hover": {
        opacity: 0.9,
      },
    },
    primary: {
      variant: "buttons.default",
      backgroundColor: "secondary",
    },
    secondary: {
      variant: "buttons.default",
      backgroundColor: "primary",
    },
    close: {
      cursor: "pointer",
    },
  },

  forms: {
    input: {
      borderColor: "floralWhite",
      color: "text",
      fontSize: 1,
      borderWidth: 2,
      backgroundColor: "shades.section",
      p: 3,
      ":placeholder": {
        color: "text",
      },
    },
  },

  messages: {
    default: {
      display: "flex",
      alignItems: "center",
      px: 3,
      py: 3,
      justifyContent: "space-between",
      color: "text",
      backgroundColor: "shades.section",
    },
    success: {
      borderLeftColor: "primary",
      variant: "messages.default",
    },
    pending: {
      borderLeftColor: "tertiary",
      variant: "messages.default",
    },
    error: {
      variant: "messages.default",
      py: 2,
      borderLeftColor: "secondary",
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

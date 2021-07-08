const theme = {
  borderWidths: [2, 4, 6],

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

  space: [
    "0rem",
    "0.25rem",
    "0.5rem",
    "1rem",
    "2rem",
    "4rem",
    "8rem",
    "16rem",
    "32rem",
    "64rem",
  ],

  sizes: {
    tiny: "45ch",
    narrow: "65ch",
    container: "75ch",
    wide: "100ch",
  },

  fontSizes: [
    "0.512rem",
    "0.64rem",
    "0.8rem",
    "1rem",
    "calc(100% + 0.5vw)",
    "calc(110% + 0.75vw)",
    "calc(120% + 1vw)",
    "calc(130% + 1.5vw)",
  ],

  lineHeights: {
    compact: 1.2,
    body: 1.5,
    heading: 1.25,
    list: 2,
  },

  radii: [0, 20],

  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      fontSize: "calc(112.5% + 0.25vw)",
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
      fontSize: 7,
    },
    h2: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 6,
      marginTop: 5,
      marginBottom: 3,
    },
    h3: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 5,
      marginTop: 5,
      marginBottom: 3,
    },
    h4: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: 4,
      marginTop: 4,
      marginBottom: 2,
    },
    h5: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "heading",
      fontSize: 3,
      marginTop: 5,
      marginBottom: 2,
    },
    h6: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "heading",
      fontSize: 2,
      marginTop: 5,
      marginBottom: 2,
    },
    p: {
      fontSize: 3,
      margin: "0.5em 0",
      "&.intro": {
        fontSize: "120%",
      },
      "&.dense": {
        lineHeight: "compact",
      },
      "& small": {
        fontSize: "85%",
      },
    },
    em: {
      color: "secondary",
      fontSize: "85%",
      fontFamily: "highlight",
      ":nth-of-type(2n)": {
        color: "primary",
      },
      "&.primary": {
        color: "primary",
      },
      "&.secondary": {
        color: "secondary",
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
    dl: {
      marginTop: 5,
    },
    dt: {
      alignItems: "center",
      display: "flex",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
      mb: 2,
      h4: {
        minWidth: "100%",
      },
      svg: {
        fill: "tertiary",
        mr: 2,
      },
    },
    dd: {
      margin: 0,
      mb: 4,
      maxWidth: "40ch",
      lineHeight: "compact",
      h4: {
        fontFamily: "body",
        fontWeight: "heading",
        fontSize: 3,
        margin: 0,
        "+ p": {
          fontSize: 2,
        },
      },
    },
  },

  buttons: {
    default: {
      color: "white !important",
      fontSize: 2,
      fontWeight: "bold",
      fontFamily: "heading",
      transition: ".2s linear background",
      "&:hover": {
        backgroundColor: "tertiary",
      },
      "&.disabled, &:disabled": {
        opacity: 0.6,
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
      fontSize: 2,
      borderWidth: 2,
      backgroundColor: "shades.section",
      p: 2,
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
    narrow: {
      maxWidth: "narrow",
      px: [3, 5],
    },
    container: {
      maxWidth: "container",
      px: [3, 5],
    },
    wide: {
      px: [3, 5],
      maxWidth: "wide",
    },
  },

  links: {
    variant: "styles.a",
  },
}

export default theme

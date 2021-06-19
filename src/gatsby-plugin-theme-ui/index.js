const theme = {
  colors: {
    text: "#3d3c31",
    textDark: "#000c22",
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
    body: "FuturaPTBook, system-ui, Arial, sans-serif",
    heading: "FuturaPTBold, system-ui, Arial, sans-serif",
    monospace: "monospace",
  },

  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },

  fontSizes: [".75rem", ".875rem", "1rem", "1.25rem", "2rem", "3rem"],

  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },

  radii: [0, 20],

  sizes: {
    container: 800,
    hero: 600,
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
      fontSize: "95%",
      backgroundColor: "shades.code",
    },
    hr: {
      color: "shades.section",
      my: 4,
    },
  },

  text: {
    default: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
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
}

export default theme

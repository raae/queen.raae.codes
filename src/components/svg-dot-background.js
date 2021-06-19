import React from "react"
import { Box } from "theme-ui"

const SvgDotBackground = ({ dotOpacity }) => {
  return (
    <Box
      className="svg-dot-background"
      sx={{
        backgroundImage: "url(./polka-dots.svg)",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: dotOpacity,
      }}
    />
  )
}

export default SvgDotBackground

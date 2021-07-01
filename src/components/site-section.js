import React from "react"
import { Box, Container, BaseStyles } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

const SiteSection = ({
  children,
  backgroundColor = "background",
  textAlign = "left",
  showDots = false,
  dotOpacity = 0.7,
  width = "container",
  height = "default",
}) => {
  return (
    <Box
      as="section"
      sx={{
        position: "relative",
        backgroundColor: backgroundColor,
        textAlign,
        py: height === "dense" ? 0 : 5,
        "div + h2": {
          mt: 3,
        },
      }}
    >
      <Container variant={width} sx={{ position: "relative", zIndex: 1 }}>
        <BaseStyles>{children}</BaseStyles>
      </Container>
      {showDots ? <SvgDotBackground dotOpacity={dotOpacity} /> : null}
    </Box>
  )
}

export default SiteSection

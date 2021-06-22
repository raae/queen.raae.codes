import React from "react"
import { Box, Container, BaseStyles } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

const SiteSection = ({
  children,
  backgroundColor = "background",
  textAlign = "left",
  icon,
  showDots = false,
  dotOpacity = 0.7,
}) => {
  return (
    <Box
      as="section"
      sx={{
        position: "relative",
        backgroundColor: backgroundColor,
        textAlign,
        py: 5,
        "*:first-child": {
          marginTop: 0,
        },
        "*:last-child": {
          marginBottom: 0,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        {icon ? <Box my="4">{icon}</Box> : null}
        <BaseStyles>{children}</BaseStyles>
      </Container>
      {showDots ? <SvgDotBackground dotOpacity={dotOpacity} /> : null}
    </Box>
  )
}

export default SiteSection

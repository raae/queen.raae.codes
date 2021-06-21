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
        pt: icon ? 4 : [4, 5],
        pb: [4, 5],
        backgroundColor: backgroundColor,
        textAlign,
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

import React from "react"
import { Box, Container, Grid, Heading, Text } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

const SiteSection = ({
  children,
  backgroundColor = "background",
  icon,
  heading,
  subHeading,
  body,
  showDots = false,
  dotOpacity = 0.7,
}) => {
  return (
    <Box
      as="section"
      sx={{
        position: "relative",
        pt: icon ? 5 : [5, 6],
        pb: [5, 6],
        backgroundColor: backgroundColor,
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          sx={{
            gap: 2,
            mb: 4,
          }}
        >
          {icon ? <Box>{icon}</Box> : null}
          <Heading
            as="h2"
            variant="heading.h2"
            sx={{
              textAlign: "center",
            }}
          >
            {heading}
          </Heading>
          {subHeading ? (
            <Heading
              as="h3"
              variant="heading.h3"
              sx={{
                textAlign: "center",
              }}
            >
              {subHeading}
            </Heading>
          ) : null}

          <Text
            as="p"
            sx={{
              textAlign: "center",
            }}
          >
            {body}
          </Text>
        </Grid>
        {children}
      </Container>
      {showDots ? <SvgDotBackground dotOpacity={dotOpacity} /> : null}
    </Box>
  )
}

export default SiteSection

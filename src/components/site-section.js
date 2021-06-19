import React from "react"
import { Box, Container, Grid, Heading, Text } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

import { isFunction } from "../utils"

const SiteSection = ({
  children,
  backgroundColor = "background",
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
        py: 6,
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
          <Heading
            sx={{
              textAlign: "center",
            }}
          >
            {isFunction(heading) ? heading() : heading}
          </Heading>
          {subHeading ? (
            <Heading
              as="h3"
              sx={{
                textAlign: "center",
              }}
            >
              {isFunction(subHeading) ? subHeading() : subHeading}
            </Heading>
          ) : null}

          <Text
            as="p"
            sx={{
              textAlign: "center",
            }}
          >
            {isFunction(body) ? body() : body}
          </Text>
        </Grid>
        {children}
      </Container>
      {showDots ? <SvgDotBackground dotOpacity={dotOpacity} /> : null}
    </Box>
  )
}

export default SiteSection

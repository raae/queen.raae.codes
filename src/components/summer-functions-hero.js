import React from "react"
import { Box, Grid, Container, Heading, Text } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

import SvgSummerBuntin from "./svg-summer-buntin"
import SvgSummerFunctions from "./svg-summer-functions"
import SvgWith from "./svg-with"
import SvgLockup from "./svg-lockup"

const SvgSummerFunctionsHero = () => {
  return (
    <Box
      as="section"
      sx={{
        backgroundColor: "shades.hero",
      }}
    >
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid
          sx={{
            gap: 5,
          }}
        >
          <SvgSummerBuntin />
          <Box>
            <Heading
              as="h1"
              variant="heading.h1"
              ariaHidden="true"
              sx={{
                textAlign: "center",
                display: "none",
              }}
            >
              Summer Functions
            </Heading>
            <SvgSummerFunctions />
            <Box
              sx={{
                mx: [5, 0],
              }}
            >
              <SvgWith />
            </Box>
            <Grid
              sx={{
                mb: 5,
              }}
            >
              <Box
                sx={{
                  mx: [4, 0],
                }}
              >
                <SvgLockup />
              </Box>
              <Text
                as="p"
                sx={{
                  textAlign: "center",
                  mx: "auto",
                  maxWidth: ["100%", "70%"],
                }}
              >
                Have{" "}
                <Text sx={{ color: "primary", fontFamily: "highlight" }}>
                  fun
                </Text>{" "}
                this summer learning <strong>Gatsby Functions</strong> by adding
                at least three{" "}
                <Text sx={{ color: "secondary", fontFamily: "highlight" }}>
                  serverless
                </Text>{" "}
                functions to your Gastby site!
              </Text>
            </Grid>
          </Box>
        </Grid>
      </Container>
      <SvgDotBackground dotOpacity={0.2} />
    </Box>
  )
}

export default SvgSummerFunctionsHero

import React from "react"
import { Box, Container, Heading, Text } from "theme-ui"

import SvgDotBackground from "../components/svg-dot-background"

import SummerBuntin from "./summer-buntin"
import SummerFunctions from "../summer-functions"
import With from "./with"
import Lockup from "./lockup"

const SummerFunctionsHero = () => {
  return (
    <Box
      as="section"
      sx={{
        backgroundColor: "shades.hero",
        minHeight: "hero",
      }}
    >
      <Container
        sx={{
          position: "relative",

          zIndex: 1,
        }}
      >
        <SummerBuntin />
        <Box>
          <Heading
            as="h1"
            ariaHidden="true"
            sx={{
              textAlign: "center",
              display: "none",
            }}
          >
            Summer Functions
          </Heading>
          <SummerFunctions />
          <With />
          <Lockup />
          <Text
            as="p"
            sx={{
              textAlign: "center",
              mx: "auto",
              maxWidth: ["100%", "70%"],
            }}
          >
            Have <Text sx={{ color: "primary" }}>fun</Text> this summer learning{" "}
            <strong>Gatsby Functions</strong> by adding at least three{" "}
            <Text sx={{ color: "secondary" }}>serverless</Text> features to your
            Gastby site!
          </Text>
        </Box>
      </Container>
      <SvgDotBackground dotOpacity={0.2} />
    </Box>
  )
}

export default SummerFunctionsHero

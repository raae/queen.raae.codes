import React from "react"
import { Grid, Box, Button, Heading, Paragraph, Container } from "theme-ui"

const PricingTable = () => {
  return (
    <>
      <Grid columns={3} gap="4">
        <Box>
          <Heading as="h3" mb="3" sx={{ fontWeight: "900 !important" }}>
            Ship Cat
          </Heading>

          <Box
            as="ul"
            mb={3}
            sx={{
              listStyle: "none",
              padding: 0,
              li: { marginBottom: 2 },
            }}
          >
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Challenges
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; GitHub repo with solutions and discussions
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Live Webinars
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ❌
              </span>
              &nbsp; 5 Group Coaching Sessions
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ❌
              </span>
              &nbsp; 3 Pair Programming Sessions
            </li>
          </Box>
          <Button
            as="a"
            href="https://buy.stripe.com/cN2cQO0XWf946oo9AA"
            sx={{ width: "100%", fontWeight: 600, color: "#fff !important" }}
          >
            $250
          </Button>
        </Box>
        <Box>
          <Heading as="h3" mb="3" sx={{ fontWeight: "900 !important" }}>
            Sailor
          </Heading>
          <Box
            as="ul"
            mb={3}
            sx={{
              listStyle: "none",
              padding: 0,
              li: { marginBottom: 2 },
            }}
          >
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Challenges
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; GitHub repo with solutions and discussions
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Live Webinars
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ✅
              </span>
              &nbsp; 5 Group Coaching Sessions
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ❌
              </span>
              &nbsp; 3 Pair Programming Sessions
            </li>
          </Box>
          <Button
            as="a"
            href="https://buy.stripe.com/4gw4ki9us6CyfYY5kl"
            sx={{ width: "100%", fontWeight: 600, color: "#fff !important" }}
          >
            $550
          </Button>
        </Box>
        <Box>
          <Heading as="h3" mb="3" sx={{ fontWeight: "900 !important" }}>
            Sea Dog
          </Heading>
          <Box
            as="ul"
            mb={3}
            sx={{
              listStyle: "none",
              padding: 0,
              li: { marginBottom: 2 },
            }}
          >
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Challenges
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; GitHub repo with solutions and discussions
            </li>
            <li>
              <span role="img" aria-label="Includes">
                ✅
              </span>
              &nbsp; 5 Live Webinars
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ✅
              </span>
              &nbsp; 5 Group Coaching Sessions
            </li>
            <li>
              <span role="img" aria-label="Does not includes">
                ✅
              </span>
              &nbsp; 3 Pair Programming Sessions
            </li>
          </Box>
          <Button
            disabled
            as="a"
            href="https://buy.stripe.com/8wM5omayw3qm3cc4gi"
            sx={{ width: "100%", fontWeight: 600, color: "#fff !important" }}
          >
            $1375
          </Button>
        </Box>
      </Grid>

      <Box mt={4} sx={{ textAlign: "center" }}>
        <p>
          <a hre="#">Something plan ($49):</a> Access to GitHub repo with
          solutions and discussions only.
        </p>
        <p>
          <small>
            <strong>Need a discount?</strong> If for some reason these prices
            are outrageous for you (between jobs, transitioning into tech etc.
            etc.) email{" "}
            <a href="mailto:queen+mercy@raae.codes">queen+mercy@raae.codes</a>.
          </small>
        </p>
      </Box>
    </>
  )
}

export default PricingTable

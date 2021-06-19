import React from "react"
import { Link } from "gatsby"
import { Badge, Box, Heading, Paragraph, Container } from "theme-ui"

import { NewsletterForm } from "../../components/newsletter-form"
import { PageLayout } from "../../components/page-layout"

const SummerFunctionFree = () => {
  return (
    <PageLayout>
      <Container sx={{ maxWidth: 800 }}>
        <Link to="/">
          <Badge>← Summer Functions</Badge>
        </Link>
        <Box my="5">
          <Heading as="h1">Sign up</Heading>
        </Box>
        <Paragraph
          sx={{
            marginTop: 5,
            marginBottom: 5,
            fontSize: 3,
            fontWeight: 600,
          }}
        >
          Get the free challenges and copy/pastable solutions by signing up for
          Queen Raae's Gatsby Newsletter.
        </Paragraph>
        <NewsletterForm />
      </Container>
      <Container sx={{ maxWidth: 640 }}>
        <Box mt={6}>
          <h2>Weekly Schedule</h2>

          <h3>
            <span role="img" aria-label="Lightbulb emoji">
              💡
            </span>
            &nbsp;&nbsp;Saturday
          </h3>
          <Paragraph sx={{ marginBottom: 4, fontSize: 3 }}>
            Eagerly await the challenge arriving in your inbox and start hacking
            away right away, or wait until Monday.
          </Paragraph>

          <h3>
            <span role="img" aria-label="Calendar emoji">
              🗓️
            </span>
            &nbsp;&nbsp;Mid week
          </h3>
          <Paragraph sx={{ marginBottom: 4, fontSize: 3 }}>
            Keep in touch with the Nattermob Crew using #GatsbySummerFunctions
            on Twitter. We would love to see how you get on!
          </Paragraph>

          <h3>
            <span role="img" aria-label="Repeat emoji">
              📨
            </span>
            &nbsp;&nbsp;Friday
          </h3>
          <Paragraph
            sx={{
              marginBottom: 4,
              fontSize: 3,
            }}
          >
            Refresh your inbox until the challenge wrap up comes through
            including a possible solution to the challenge you may copy/paste.
          </Paragraph>
          <p>
            <span role="img" aria-label="Party popper emojis">
              ♻️
            </span>
            &nbsp;Rinse and repeat for 5 weeks
          </p>
        </Box>
      </Container>
    </PageLayout>
  )
}

export default SummerFunctionFree

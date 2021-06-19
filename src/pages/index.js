import React, { Fragment } from "react"
import { Heading, Text, Box, Link, Divider } from "theme-ui"

import SummerFunctionsHero from "../components/summer-functions-hero"
import SiteSection from "../components/site-section"
import NewsletterForm from "../components/newsletter-form"

const IndexPage = () => {
  return (
    <Fragment>
      <SummerFunctionsHero />
      <SiteSection
        heading="Stay in the loop"
        body={() => (
          <Fragment>
            To get notified about <strong>pricing</strong> and availability,
            sign up for Queen Raae's Gatsby Newsletter.
          </Fragment>
        )}
      >
        <NewsletterForm cta="Add me on the list!" />
      </SiteSection>
      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Clear as mud"
        subHeading="Tried and failed with serverless/lambda/aws before?"
        body="Newly released Gatsby Functions radically simplifies how to write and deploy serverless functions. By adding features to your own existing Gatsby site you'll have home turf advantage, and we're here to make sure you get all the way to deploy this time"
      />
      <SiteSection
        heading="Beyond the basics"
        subHeading={() => (
          <Fragment>
            Done the{" "}
            <Box
              as="code"
              variant="styles.code"
            >{`res.send({hello: "world"})`}</Box>
            example, now what?
          </Fragment>
        )}
        body="Not sure what to use Gatsby Functions for? Or how to make them
        production ready? Get practical real world experience by completing
        our weekly challenges. We'll also throw in some whimsy, because why
        not have some fun while you are at it"
      />

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Five weeks, Five Challenges"
        subHeading="You'll have access to the material forever. So take a week off if something better comes up; like a trip on a pirate ship"
      >
        <Heading as="h4">The Challenges</Heading>
        <Box as="ul">
          <Box as="li">
            <Heading as="h5">Week 1</Heading>
            <Text>TBC</Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Week 2</Heading>
            <Text>TBC</Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Week 3</Heading>
            <Text>TBC</Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Week 4</Heading>
            <Text>TBC</Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Week 5</Heading>
            <Text>TBC</Text>
          </Box>
        </Box>
        <Divider />
        <Heading as="h4">The Weekly Schedule</Heading>
        <Box as="ul">
          <Box as="li">
            <Heading as="h5">Saturday</Heading>
            <Text>
              Eagerly await the challenge. Start hacking right away, or wait
              until Monday
            </Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Tuesday</Heading>
            <Text>
              Join the live webinar where we'll code through a possible solution
              to the challenge, and you'll be able to ask us questions.
            </Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Wednesday</Heading>
            <Text>
              Stuck? Bring your code and/or questions to the the workshop, and
              we'll help you through it in a small group setting
            </Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Friday</Heading>
            <Text>
              We'll wrap up the challenge Nattermob style with a piratical live
              stream on YouTube
            </Text>
          </Box>
          <Box as="li">
            <Heading as="h5">Repeat</Heading>
            <Text>We’ll rinse and repeat this cycle for 5 weeks</Text>
          </Box>
        </Box>
      </SiteSection>

      <SiteSection
        heading="Join the fun"
        body={() => (
          <Fragment>
            We are super exited to see what you come up! Make sure to share your
            work on Twitter with{" "}
            <Link
              href="https://twitter.com/search?q=%23GatsbySummerFunctions&src=typed_query"
              target="_blank"
              rel="noopener"
            >
              #GatsbySummerFunctions
            </Link>
          </Fragment>
        )}
      >
        <NewsletterForm cta="Tell me more" />
      </SiteSection>

      <SiteSection
        backgroundColor="shades.section"
        showDots={true}
        heading="Questions"
        body={() => (
          <Fragment>
            Send email to{" "}
            <Link href="mailto:queen@raae.codes">queen@raae.codes</Link>
          </Fragment>
        )}
      ></SiteSection>
    </Fragment>
  )
}

export default IndexPage

import React from "react"
import { Box, Badge, Heading, Paragraph, Container } from "theme-ui"

import { PageLayout } from "../components/page-layout"
import { NewsletterForm } from "../components/newsletter-form"

// markup
const IndexPage = () => {
  return (
    <PageLayout>
      <Container sx={{ maxWidth: 760 }}>
        <Badge>Coming soon</Badge>
        <Box my="5">
          <Heading as="h1">
            Gatsby Summer Functions
            <br />
          </Heading>
          <Heading
            as="h2"
            sx={{
              strong: { color: "secondary", fontWeight: 800 },
            }}
          >
            — with <strong>Queen Raae</strong> and the Nattermob Pirates{" "}
          </Heading>
          <Paragraph
            mt="5"
            sx={{
              fontSize: 3,
              fontWeight: 600,
            }}
          >
            Join the fun this summer and learn Gatsby Functions by adding at
            least three serverless features to your existing Gatsby
            site&nbsp;&nbsp;
            <span role="img" aria-label="Party popper emojis">
              🎉🎉🎉
            </span>
          </Paragraph>
        </Box>
      </Container>
      <NewsletterForm cta="Add me on the list!" my="6" sx={{ maxWidth: 640 }}>
        <Paragraph mb="4" sx={{ fontSize: "3" }}>
          To get notified about <strong>pricing</strong> and availability,
          <br /> sign up for Queen Raae's Gatsby Newsletter.
        </Paragraph>
      </NewsletterForm>
      <Container sx={{ maxWidth: 640 }}>
        <Box as="article" my="6">
          <Heading as="h2">
            Tried and failed with serverless/lambda/aws before?
          </Heading>
          <Paragraph mt="4" mb="5">
            Newly released Gatsby Functions radically simplifies how to write
            and deploy serverless functions. By adding features to your own
            existing Gatsby site you'll have home turf advantage, and we're here
            to make sure you get all the way to deploy this time{" "}
            <span role="img" aria-label="Muscle emojis">
              💪
            </span>
          </Paragraph>
          <Heading as="h2">
            Done the{" "}
            <code
              style={{ fontSize: "inherit" }}
            >{`res.send({hello: "world"})`}</code>{" "}
            example, now what?
          </Heading>
          <Paragraph mt="4" mb="5">
            Not sure what to use Gatsby Functions for? Or how to make them
            production ready? Get practical real world experience by completing
            our weekly challenges. We'll also throw in some whimsy, because why
            not have some fun while you are at it{" "}
            <span role="img" aria-label="Muscle emojis">
              🤪
            </span>
          </Paragraph>
        </Box>

        <Box as="article" my="5">
          <Heading as="h1" mt="5" mb="4">
            5 weeks &nbsp;➡&nbsp; 5 challenges
          </Heading>
          <Paragraph
            sx={{
              marginTop: 5,
              marginBottom: 5,
              fontSize: 3,
              fontWeight: 600,
            }}
          >
            You'll have access to the material forever. So take a week off if
            something better comes up; like a trip on a pirate ship{" "}
            <span role="img" aria-label="Lightbulb emoji">
              🏴‍☠️
            </span>{" "}
          </Paragraph>

          <h2>The Challenges</h2>

          <h3>Week 1</h3>
          <p>To be decided</p>

          <h3>Week 2</h3>
          <p>To be decided</p>

          <h3>Week 3</h3>
          <p>To be decided</p>

          <h3>Week 4</h3>
          <p>To be decided</p>

          <h3>Week 5</h3>
          <p>To be decided</p>

          <Heading mt="5" mb="4">
            The Weekly Schedule
          </Heading>

          <h3>
            <span role="img" aria-label="Lightbulb emoji">
              💡
            </span>
            &nbsp;&nbsp;Saturday
          </h3>
          <Paragraph sx={{ marginBottom: 4, fontSize: 3 }}>
            Eagerly await the challenge. Start hacking right away, or wait until
            Monday.
          </Paragraph>

          <h3>
            <span role="img" aria-label="Teacher emoji">
              👩‍🏫
            </span>
            &nbsp;&nbsp;Tuesday
          </h3>
          <Paragraph
            sx={{
              marginBottom: 4,
              fontSize: 3,
              strong: { color: "primary" },
            }}
          >
            Join the <strong>live webinar</strong> where we'll code through a
            possible solution to the challenge, and you'll be able to ask us
            questions.
          </Paragraph>

          <h3>
            <span role="img" aria-label="School emoji">
              🏫
            </span>
            &nbsp;&nbsp;Wednesday
          </h3>
          <Paragraph
            sx={{
              marginBottom: 4,
              fontSize: 3,
              strong: { color: "primary" },
            }}
          >
            <em>Stuck?</em> Bring your code and/or questions to the{" "}
            <strong>the workshop</strong>, and we'll help you through it in a
            small group setting.
          </Paragraph>

          <h3>
            <span role="img" aria-label="Pirate flag emoji">
              🔴
            </span>
            &nbsp;&nbsp;Friday
          </h3>
          <Paragraph
            sx={{
              marginBottom: 4,
              fontSize: 3,
            }}
          >
            We'll wrap up the challenge Nattermob style with a piratical live
            stream on YouTube 🏴‍☠️
          </Paragraph>
          <p>
            <span role="img" aria-label="Recycle emoji">
              ♻️
            </span>
            &nbsp;Rinse and repeat for 5 weeks
          </p>
        </Box>

        <Box my="5">
          <h1>Join the fun</h1>
          <p>
            We are super exited to see what you come up!
            <br /> Make sure to share your work on Twitter with
            #GatsbySummerFunctions.
          </p>
        </Box>
      </Container>
      {/* <PricingTable sx={{ maxWidth: 960 }} /> */}
      <NewsletterForm cta="Tell me more" my="6" sx={{ maxWidth: 640 }}>
        <Paragraph mb="3" sx={{ fontSize: "3" }}>
          To get notified about <strong>pricing</strong> and availability,
          <br /> sign up for Queen Raae's Gatsby Newsletter.
        </Paragraph>
      </NewsletterForm>

      <Paragraph mt="5" sx={{ textAlign: "center" }}>
        <strong>Questions?</strong>
        <br />
        Send an email to <a href="mailto:queen@raae.codes">queen@raae.codes</a>.
      </Paragraph>

      {/* <Crew sx={{ textAlign: "center", maxWidth: 1024 }} />
      <GatsbyDeepDives my="6" sx={{ textAlign: "center", maxWidth: 1024 }} /> */}

      {/* <Paragraph mt="6" sx={{ textAlign: "center" }}>
        — Queen <a href="https://twitter.com/raae">@raae</a> and the Nattermob
        Pirates
      </Paragraph> */}
    </PageLayout>
  )
}

export default IndexPage

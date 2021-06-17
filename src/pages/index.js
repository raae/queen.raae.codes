import React from "react";
import { Box, Badge, Heading, Paragraph, Container } from "theme-ui";

import { PageLayout } from "../components/PageLayout";
import { NewsletterForm } from "../components/NewsletterForm";
import { PricingTable } from "../components/PricingTable";

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
            sx={{
              marginTop: 5,
              marginBottom: 5,
              fontSize: 3,
              fontWeight: 600,
            }}
          >
            Get past{" "}
            <code
              style={{ fontSize: "inherit" }}
            >{`res.send({hello: "world"})`}</code>{" "}
            and have fun learning Gatsby Functions this summer by adding at
            least three serverless features to your existing Gatsby
            site&nbsp;&nbsp;
            <span role="img" aria-label="Party popper emojis">
              🎉🎉🎉
            </span>{" "}
          </Paragraph>
        </Box>
      </Container>
      <Container sx={{ maxWidth: 640 }}>
        <Box as="article" my="5">
          <h2>Tried and failed with serverless before?</h2>
          <p>
            Newly released Gatsby Functions radically simplifies how to write
            and deploy serverless functions. By adding features to your existing
            Gatsby site you'll even have home turf advantage.
          </p>
          <h2>
            Not sure where to start, what to make or afraid of getting stuck?
          </h2>
          <p>
            Our challenges will get you started! Ranging from the very practical
            to the super whimsical. And we are here to make sure you get all the
            way to deploy with live webinars, group coaching and pair
            programming.
          </p>
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
            Eagerly await the challenge arriving in your inbox and start hacking
            away right away, or wait until Monday.
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
            Join the <strong>live webinar</strong> (or watch the replay) where
            Queen Raae codes and talks you through a possible solution to the
            challenge.
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
            <em>Stuck?</em> Bring your code or questions to{" "}
            <strong>group coaching</strong> and we'll do our best to help you
            through it.
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
            Refresh your inbox until the challenge "wrap up" comes through,
            including a possible solution to the challenge you may copy/paste.
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
      <PricingTable sx={{ maxWidth: 960 }} />
      <Paragraph my="5" sx={{ textAlign: "center" }}>
        <strong>Other Questions?</strong>
        <br /> Direct message <a href="https://twitter.com/raae">@raae</a> or
        send an email to <a href="mailto:queen@raae.codes">queen@raae.codes</a>.
      </Paragraph>

      <NewsletterForm mt="6" sx={{ textAlign: "center", maxWidth: 600 }}>
        <Paragraph mb="3" sx={{ fontSize: "3" }}>
          To get notified when we officially launch,
          <br /> sign up for Queen Raae's Gatsby Newsletter.
        </Paragraph>
      </NewsletterForm>
      {/* <Crew sx={{ textAlign: "center", maxWidth: 1024 }} />
      <GatsbyDeepDives my="6" sx={{ textAlign: "center", maxWidth: 1024 }} /> */}

      {/* <Paragraph mt="6" sx={{ textAlign: "center" }}>
        — Queen <a href="https://twitter.com/raae">@raae</a> and the Nattermob
        Pirates
      </Paragraph> */}
    </PageLayout>
  );
};

export default IndexPage;

import React from "react";
import { PageLayout } from "../components/PageLayout";
import { Box, Badge, Progress, BaseStyles, Heading, Paragraph } from "theme-ui";
import { NewsletterForm } from "../components/NewsletterForm";

// markup
const IndexPage = () => {
  return (
    <PageLayout>
      <BaseStyles>
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
            sx={{ marginTop: 5, marginBottom: 5, fontSize: 3, fontWeight: 600 }}
          >
            Have fun this summer learning Gatsby Functions by adding at least
            three serverless features to your Gastby site by joining Queen
            Raae’s Summer of Functions&nbsp;&nbsp;
            <span role="img" aria-label="Party popper emojis">
              🎉🎉🎉
            </span>{" "}
          </Paragraph>
        </Box>
        <Box my={4}>
          <h3>Stay in the loop</h3>

          <p>
            This is very much a YOLO idea that is not fully formed yet; if you
            would like to stay in the loop and get notified when we launch, sign
            up{" "}
            <span role="img" aria-label="Pointing finger">
              👇
            </span>{" "}
          </p>
          <NewsletterForm />
        </Box>
        <Progress max={1} value={1 / 10}>
          10%
        </Progress>
        <Box as="article" my="5">
          <Badge>Draft&hellip;</Badge>
          <h1>5 weeks &nbsp;➡&nbsp; 5 challenges</h1>
          <Paragraph
            sx={{ marginTop: 5, marginBottom: 5, fontSize: 3, fontWeight: 600 }}
          >
            Get passed{" "}
            <code
              style={{ fontSize: "inherit" }}
            >{`res.send({hello: "world"})`}</code>{" "}
            with challenges you'll have fun implementing on your existing Gatsby
            site/blog this summer.
          </Paragraph>

          <h2>Weekly Schedule</h2>

          <h3>
            <span role="img" aria-label="Repeat emoji">
              💡
            </span>
            &nbsp;&nbsp;Friday
          </h3>
          <Paragraph sx={{ marginBottom: 4, fontSize: 3 }}>
            Eagerly await the challenges arriving in your inbox and start
            hacking away that weekend, or wait until Monday.
          </Paragraph>

          <h3>
            <span role="img" aria-label="Repeat emoji">
              👩‍🏫
            </span>
            &nbsp;&nbsp;Tuesday
          </h3>
          <Paragraph
            sx={{ marginBottom: 4, fontSize: 3, strong: { color: "primary" } }}
          >
            Join the <strong>live webinar</strong> (or watch the replay) where
            Queen Raae code and talk you through a possible solutions to the
            challenge.
          </Paragraph>

          <h3>
            <span role="img" aria-label="Repeat emoji">
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
            &nbsp;&nbsp;Thursday
          </h3>
          <Paragraph
            sx={{
              marginBottom: 4,
              fontSize: 3,
            }}
          >
            Refresh your inbox until you the copy/pastable possible solutions to
            the challenge shows up.
          </Paragraph>
          <p>
            <span role="img" aria-label="Party popper emojis">
              ♻️
            </span>
            &nbsp;Rinse and repeat for 5 weeks
          </p>
        </Box>
        <Box my="5">
          <h1>Join the fun</h1>
          <p>Free code examples, paid weekly webinar and group coaching.</p>
        </Box>
        <Box my="5">
          <p>
            — Queen @<a href="https://twitter.com/raae">Raae</a> and the
            Nattermob Pirates
          </p>
        </Box>
      </BaseStyles>
    </PageLayout>
  );
};

export default IndexPage;

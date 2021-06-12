import React from "react";
import { PageLayout } from "../components/PageLayout";
import { Box, Badge, Message, Progress } from "theme-ui";
import { NewsletterForm } from "../components/NewsletterForm";

// markup
const IndexPage = () => {
  return (
    <PageLayout>
      <Badge>Coming soon (maybe&hellip;)</Badge>
      <Box my="5">
        <h1>
          Queen @Raae's Summer Functions <br />
        </h1>
        <h2>
          — learn functions by adding some fun features to your own personal
          site this summer{" "}
          <span role="img" aria-label="Party popper emojis">
            🎉🎉🎉
          </span>{" "}
        </h2>
        <Message mt="4" variant="primary">
          Join <a href="https://twitter.com/raae">me</a>, @
          <a href="https://twitter.com/PaulieScanlon">PaulieScanlon</a>, and
          hopefully a bunch of other pirates this summer and level up your web
          dev knowledge with{" "}
          <a href="https://www.gatsbyjs.com/products/cloud/functions/">
            Gatsby Functions
          </a>
          .{" "}
        </Message>
      </Box>

      <Box my={4}>
        <h3>Coming soon (maybe...)</h3>

        <p>
          This is very much a YOLO idea that is not fully formed yet; if you
          would like to get notified when it is fully formed, sign up{" "}
          <span role="img" aria-label="Pointing finger">
            👇
          </span>{" "}
        </p>
        <NewsletterForm />
      </Box>
      <Progress max={1} value={1 / 10}>
        10%
      </Progress>

      <Box my="5">
        <Badge>Draft&hellip;</Badge>
        <h1>5 weeks &nbsp;➡&nbsp; 5 fun features</h1>
        <p>
          Add all, one or some of the proposed feature to your site. Make them
          your own, or even come up with something totally different.
        </p>
        <h2>Weekly Code Sample</h2>
        <p>More to come&hellip;</p>
        <h2>Weekly Webinar</h2>
        <p>More to come&hellip;</p>
        <h2>Weekly Coworking</h2>
        <p>More to come&hellip;</p>
      </Box>

      <Box my="5">
        <h1>Price</h1>
        <p>Free code examples, paid weekly webinar and coworking.</p>
      </Box>
      <Box my="5">
        <p>
          — Queen @<a href="https://twitter.com/raae">Raae</a>
        </p>
      </Box>
    </PageLayout>
  );
};

export default IndexPage;

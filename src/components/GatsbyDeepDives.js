import React from "react";
import { Grid, Embed, Heading, Paragraph, Container, Link } from "theme-ui";

export const GatsbyDeepDives = (props) => {
  return (
    <Container {...props}>
      <Heading as="h1" mb="2">
        Gatsby Deep Dives
      </Heading>
      <Heading as="h3" mb="4">
        More from Queen Raae and the Nattermob Pirates
      </Heading>
      <Paragraph
        mb="3"
        sx={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        In April 2021 the Queen staged a coup and the Nattermob Pirates were
        formed. Thy meet every Friday for rum-fueled adventures in the sharky
        waters around the Gatsby Islands.
      </Paragraph>

      <Paragraph
        sx={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}
      >
        Our guests so far have included Ward Peters (Gatsby's lead engineer),
        Jason Lengstorf (VP of Developer Relations at Netlify) and Gatsby
        Founder Kyle Mathews.
      </Paragraph>

      <Grid mt="5" columns={2} gap={4}>
        <Embed src="https://www.youtube.com/embed/FFpplon6usI" />
        <Embed src="https://www.youtube.com/embed/gG9E7ZYbhGo" />
      </Grid>
      <Paragraph mt="4">
        <Link href="https://youtube.com/playlist?list=PL9W-8hhRoLoN7axEFJQ17rJvk2KTiM2GP">
          Be a pirate and join us on YouTube →
        </Link>
      </Paragraph>
    </Container>
  );
};

import React from "react"
import { Avatar, Grid, Box, Paragraph, Heading, Container } from "theme-ui"

export const Crew = (props) => {
  return (
    <Container {...props}>
      <Box my="6">
        <Heading as="h1" mb="5">
          Who are we?
        </Heading>
        <Heading as="h2" mb="3">
          Queen Raae
        </Heading>
        <Paragraph
          mb="4"
          sx={{ maxWidth: "46ch", marginLeft: "auto", marginRight: "auto" }}
        >
          Wrote her first JavaScript back in 1998, started playing SvgWith
          Gatsby in 2018, created gatsby-remark-oembed in 2019 and spoke at
          Gatsby Days 2020. Loves to hack together services to build out side
          projects.{" "}
        </Paragraph>
        {/* <a href="https://twitter.com/raae"> */}
        <Avatar
          sx={{ width: "200px", maxWidth: "90%" }}
          src="/raae.jpg"
        ></Avatar>
        {/* <Paragraph>@raae</Paragraph> */}
        {/* </a> */}
      </Box>
      <Heading as="h2" mb="5">
        The Nattermob Pirates
      </Heading>
      <Grid columns={3} gap={4}>
        <Box>
          {/* <a href="https://twitter.com/PaulieScanlon"> */}
          <Avatar
            mb="2"
            sx={{ width: "200px", height: "200px", maxWidth: "90%" }}
            src="/paul.jpg"
          />
          <Paragraph>Pirate Paul</Paragraph>
          {/* </a> */}
          <Paragraph
            mb="4"
            mt="2"
            sx={{
              maxWidth: "46ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Front end developer since xxxx, started using Gatsby back in 2018,
            created mdx-embed in 2019 and won the Gatsby Silly Site Challenge
            2020. If left alone, can create a style system in 11 minutes.
          </Paragraph>
        </Box>
        <Box>
          {/* <a href="https://twitter.com/OlaHolstVea"> */}
          <Avatar
            mb="2"
            sx={{ width: "200px", height: "200px", maxWidth: "90%" }}
            src="/ola.jpg"
          />
          <Paragraph>Pirate Ola</Paragraph>
          {/* </a> */}
          <Paragraph
            mb="4"
            mt="2"
            sx={{
              maxWidth: "46ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Thought himself to code using Gatsby as a spring board and currently
            making an offline workbook all about Gatsby Functions. Keeps pushing
            the Queen to explain things using stories...
          </Paragraph>
        </Box>
        {/* <Box>
          <a href="https://unsplash.com/photos/8NGWDex9qUw">
            <Avatar
              mb="2"
              sx={{ width: "200px", height: "200px", maxWidth: "90%" }}
              src="/jon-tyson-8NGWDex9qUw-unsplash.jpg"
            />
          </a>
          <Paragraph>You?</Paragraph>
          <Paragraph
            mb="4"
            mt="2"
            sx={{
              maxWidth: "46ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dabbled enough SvgWith Gatsby to get a site going. Would like to get
            going SvgWith Gatsby Serverless Functions, but need inspiration for
            what to make and some accountability to get it done.
          </Paragraph>
        </Box> */}
      </Grid>
    </Container>
  )
}

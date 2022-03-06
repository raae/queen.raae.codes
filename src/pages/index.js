import React from "react";
import { graphql, Link } from "gatsby";

import { Typography, Box, Link as MuiLink } from "@mui/material";

import Seo from "../components/seo";
import MuiAppBar from "../components/app-bar";
import EmailList from "../components/email-list";
import SiteSection from "../components/site-section";

import Noteworthy from "../components/noteworthy";
import About from "../content/about";

import NewsletterForm from "../components/newsletter";
import Prose from "../components/prose";

const IndexPage = ({ data, ...props }) => {
  const title = "Welcome to the sharky waters arround the Gatsby islands 🏴‍☠️";
  const subtitle =
    "The place to be for treasure hunts and deep dives to get the most out of Gatsby.";
  const lead = "We are here to help you navigate safely! ";

  const cite = "— Queen Raae, Cap'n Ola and Pirate Princess Lillian";

  return (
    <>
      <Seo {...props} />
      <MuiAppBar />
      <main>
        <SiteSection component="header">
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ maxWidth: "45ch", mb: 6 }}>
            <Typography variant="subtitle1" component="p" gutterBottom>
              {subtitle}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              {lead}
            </Typography>
            <Typography variant="caption" component="cite" gutterBottom>
              {cite}
            </Typography>
          </Box>
          <NewsletterForm>
            <Typography variant="body1">
              <strong>Serious about Gatsby?</strong> Sign up for emails from us
              sent every weekday to help you get the most out of Gatsby!
            </Typography>
          </NewsletterForm>
        </SiteSection>

        <SiteSection>
          <Typography variant="h2" gutterBottom>
            Latest emails
          </Typography>
          <EmailList emails={data.allEmail.nodes} sx={{ maxWidth: "50ch" }} />
          <MuiLink component={Link} to="/emails/">
            more emails...
          </MuiLink>
        </SiteSection>

        <SiteSection>
          <Typography variant="h2" gutterBottom>
            Noteworthy
          </Typography>
          <Noteworthy sx={{ maxWidth: "50ch" }} />
        </SiteSection>

        <SiteSection>
          <Typography variant="h2" gutterBottom>
            Who are we
          </Typography>
          <Prose>
            <About />
          </Prose>
        </SiteSection>

        <SiteSection>
          <NewsletterForm>
            <Typography variant="body1">
              <strong>Serious about Gatsby?</strong> Sign up for emails from us
              sent every weekday to help you get the most out of Gatsby!
            </Typography>
          </NewsletterForm>
        </SiteSection>
      </main>
    </>
  );
};

export const query = graphql`
  {
    allEmail(sort: { order: DESC, fields: date }, limit: 5) {
      nodes {
        title
        emojii
        slug
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export default IndexPage;

import React from "react";
import { graphql } from "gatsby";

import Seo from "../../components/seo";
import NewsletterForm from "../../components/newsletter";
import EmailList from "../../components/email-list";

import AppBar from "../../components/app-bar";
import { Box, Typography } from "@mui/material";
import SiteSection from "../../components/site-section";

const Emails = ({ data, ...props }) => {
  const title = "Emails to help you get the most out of Gatsby 💌";
  const description =
    "Serious about Gatsby? Sign up for emails from Queen Raae (and Cap'n Ola) sent every weekday to help you get the most out of Gatsby!";
  return (
    <>
      <Seo {...props} meta={{ title, description }} />
      <AppBar />
      <main>
        <SiteSection component="header">
          <Box sx={{ maxWidth: "55ch" }}>
            <Typography variant="h1" gutterBottom>
              {title}
            </Typography>
            <NewsletterForm>
              <Typography variant="subtitle1" component="p" gutterBottom>
                <strong>Serious about Gatsby?</strong> Sign up for emails from
                Queen Raae (and Cap'n Ola) sent every weekday to help you get
                the most out of Gatsby!
              </Typography>
            </NewsletterForm>
          </Box>
        </SiteSection>

        <SiteSection component="section">
          <EmailList emails={data.allEmail.nodes} sx={{ maxWidth: "50ch" }} />
        </SiteSection>

        <SiteSection component="footer">
          <NewsletterForm>
            <strong>Serious about Gatsby?</strong> Sign up for emails like these
            from Queen Raae (and Cap'n Ola) sent every weekday to help you get
            the most out of Gatsby!
          </NewsletterForm>
        </SiteSection>
      </main>
    </>
  );
};

export const query = graphql`
  {
    allEmail(sort: { order: DESC, fields: slug }) {
      nodes {
        title
        emojii
        slug
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export default Emails;

import React from "react";
import { graphql, Link } from "gatsby";

import { Typography, Link as MuiLink } from "@mui/material";

import Seo from "../components/seo";
import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import SiteSection from "../components/site-section";
import NewsletterForm from "../components/newsletter";

const OlaVeaEmail = ({ data, ...props }) => {
  const { date, title, emojii, description, html } = data.email || {};
  const emojis = emojii.split(" ");

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description,
        }}
      />
      <SiteHeader />
      <main>
        <SiteSection component="article">
          <Typography variant="h1" gutterBottom>
            {title}&nbsp;&nbsp;{emojis[0]}&nbsp;{emojis[1]}
          </Typography>
          <Typography variant="caption">Email sent {date} / Go to </Typography>
          <MuiLink variant="caption" component={Link} to="/emails/">
            email archive
          </MuiLink>

          <Prose sx={{ py: 2 }} html={html} />
        </SiteSection>
        <SiteSection component="footer">
          <NewsletterForm>
            <strong>Serious about Gatsby?</strong> Sign up for emails like this
            from Queen Raae (and Cap'n Ola) sent every weekday to help you get
            the most out of Gatsby!
          </NewsletterForm>
        </SiteSection>
      </main>
    </>
  );
};

export default OlaVeaEmail;

export const query = graphql`
  query OlaVeaEmailById($id: String!) {
    email: olaVeaEmail(id: { eq: $id }) {
      title
      emojii
      description
      html
      date(formatString: "MMMM Do, YYYY")
    }
  }
`;

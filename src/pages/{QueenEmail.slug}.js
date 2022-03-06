import React from "react";
import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import { Link as MuiLink, Typography } from "@mui/material";

import Seo from "../components/seo";
import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import SiteSection from "../components/site-section";
import NewsletterForm from "../components/newsletter";

const IS_PROD = process.env.NODE_ENV === "production";

const QueenEmail = ({ data, ...props }) => {
  const { date, ogImage, title, emojii, description, html } = data.email || {};

  const ogGatsbyImage = getImage(ogImage);
  const ogImageSrc = ogGatsbyImage?.images?.fallback?.src;

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description,
          image: ogImageSrc,
        }}
      />
      <SiteHeader variant="minimal" />
      <main>
        <SiteSection component="article">
          <Typography variant="h1" gutterBottom>
            {title}&nbsp;&nbsp;{emojii}
          </Typography>
          <Typography variant="caption">Email sent {date} / Go to </Typography>
          <MuiLink variant="caption" component={Link} to="/emails/">
            email archive
          </MuiLink>

          <Prose sx={{ py: 2 }} html={html} />

          {!IS_PROD && (
            <Prose>
              <img src={ogImageSrc} alt="Cover test" />
            </Prose>
          )}
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

export default QueenEmail;

export const query = graphql`
  query QueenEmailById($id: String!) {
    email: queenEmail(id: { eq: $id }) {
      title
      emojii
      description
      html
      ogImage {
        childImageSharp {
          gatsbyImageData(formats: NO_CHANGE)
        }
      }
      date(formatString: "MMMM Do, YYYY")
    }
  }
`;

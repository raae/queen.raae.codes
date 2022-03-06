import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Seo from "../components/seo";
import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionHeader,
  PageSectionBreadcrumbs,
} from "../components/page-section";
import NewsletterForm from "../components/newsletter";

const IS_PROD = process.env.NODE_ENV === "production";

const QueenEmail = ({ data, ...props }) => {
  const { date, ogImage, title, emojii, description, html } = data.email || {};
  const emojis = emojii.split(" ");

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
        <PageSection component="article">
          <PageSectionBreadcrumbs
            items={[{ label: "Daily Emails", to: "/emails/" }, { label: date }]}
          />
          <PageSectionHeader
            hLevel={1}
            title={
              <>
                {title}&nbsp;&nbsp;{emojis[0]}&nbsp;{emojis[1]}
              </>
            }
          />

          <Prose mt="3em" html={html} />

          {!IS_PROD && (
            <Prose>
              <img src={ogImageSrc} alt="Cover test" />
            </Prose>
          )}
        </PageSection>
        <PageSection component="footer">
          <NewsletterForm>
            <strong>Serious about Gatsby?</strong> Sign up for emails like this
            from Queen Raae (and Cap'n Ola) sent every weekday to help you get
            the most out of Gatsby!
          </NewsletterForm>
        </PageSection>
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

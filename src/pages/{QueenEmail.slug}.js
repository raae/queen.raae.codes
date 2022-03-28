import React from "react";
import { graphql } from "gatsby";

import Seo from "../components/seo";
import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionHeader,
  PageSectionBreadcrumbs,
} from "../components/page-section";

import { Newsletter } from "../content/newsletter";

const IS_PROD = process.env.NODE_ENV === "production";

const QueenEmail = ({ data, ...props }) => {
  const { date, ogImage, title, emojii, description, html } = data.email || {};

  const emojis = emojii.split(" ");

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description,
          image: ogImage,
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
              <img src={ogImage} alt="Cover test" />
            </Prose>
          )}
        </PageSection>
        <PageSection component="footer">
          <Newsletter />
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
      ogImage
      date(formatString: "MMMM Do, YYYY")
    }
  }
`;

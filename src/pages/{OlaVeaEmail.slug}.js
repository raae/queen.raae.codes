import React from "react";
import { graphql, Link } from "gatsby";

import { Typography, Link as MuiLink, Breadcrumbs } from "@mui/material";

import Seo from "../components/seo";
import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../components/page-section";
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

import React from "react";
import { graphql } from "gatsby";

import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";
import Seo from "../../components/seo";
import NewsletterForm from "../../components/newsletter";

import Emails from "../../content/emails";

const EmailsPage = ({ data, ...props }) => {
  const badge = "Daily emails";
  const title = "Serious about Gatsby? ";
  const description =
    "Sign up for emails from Queen Raae (and Cap'n Ola) sent every weekday to help you get the most out of Gatsby!";
  return (
    <>
      <Seo {...props} meta={{ title: badge, description }} />
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionHeader
            badge={badge}
            title={title}
            lead={description}
            hLevel={1}
          />
          <NewsletterForm mt="2em" cta="Yes, please!" formKey="queen" />
        </PageSection>

        <PageSection component="section">
          <Emails emails={data.allEmail} sx={{ maxWidth: "50ch" }} />
        </PageSection>

        <PageSection component="footer">
          <NewsletterForm cta="Yes, please!" formKey="queen">
            <strong>Serious about Gatsby?</strong> Sign up for emails like these
            from Queen Raae (and Cap'n Ola) sent every weekday to help you get
            the most out of Gatsby!
          </NewsletterForm>
        </PageSection>
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

export default EmailsPage;

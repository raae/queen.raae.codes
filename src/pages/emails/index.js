import React from "react";
import { graphql } from "gatsby";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";
import { Newsletter } from "../../components/newsletter";
import Emails from "../../components/emails";

const BADGE = "Daily Gatsby Treasures";
const TITLE = "Serious about Gatsby? ";
const DESCRIPTION =
  "Sign up for emails from Queen Raae (and Cap'n Ola) sent every weekday to help you get the most out of Gatsby!";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${BADGE} - ${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function EmailsPage({ data }) {
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionHeader
            badge={BADGE}
            title={TITLE}
            lead={DESCRIPTION}
            hLevel={1}
          />
          <Newsletter mt="2em" cta="Yes, please!" formKey="queen" />
        </PageSection>

        <PageSection component="section">
          <Emails emails={data.allEmail} sx={{ maxWidth: "50ch" }} />
        </PageSection>

        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
}

export const query = graphql`
  {
    allEmail(sort: { order: DESC, fields: slug }) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;

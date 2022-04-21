import React from "react";
import { graphql } from "gatsby";

import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../components/page-section";
import Seo from "../components/seo";

import Emails from "../content/emails";
import { Newsletter } from "../content/newsletter";

const EmailsPage = ({ pageContext, data, ...props }) => {
  const { allEmail } = data;

  const title = `Emails tagged: "${pageContext.tagLabel}"`;

  return (
    <>
      <Seo {...props} meta={{ title: title }} />
      <SiteHeader />

      <main>
        <PageSection component="article">
          <PageSectionBreadcrumbs
            items={[
              { label: "Daily Emails", to: "/emails/" },
              { label: pageContext.tagLabel },
            ]}
          />
          <PageSectionHeader title={title} hLevel={1} />

          <Emails emails={allEmail} sx={{ maxWidth: "50ch" }} />
        </PageSection>

        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
};

export const query = graphql`
  query TagById($tagLabel: String!) {
    allEmail(filter: { tags: { elemMatch: { label: { eq: $tagLabel } } } }) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;

export default EmailsPage;

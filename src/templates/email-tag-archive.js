import React from "react";
import { graphql } from "gatsby";

import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionBreadcrumbs,
  PageSectionHeader,
} from "../components/page-section";
import PageHead from "../components/page-head";

import { Emails } from "../components/emails";
import { Newsletter } from "../components/newsletter";

const getMeta = (props) => {
  const { pageContext } = props;
  const title = `Gatsby Treasures tagged: "${pageContext.tagLabel}"`;
  const description = `Learn more about "${pageContext.tagLabel}" by browsing the daily emails sent on the topic.`;
  return { title, description };
};

export function Head(props) {
  const meta = getMeta(props);
  return <PageHead {...props} meta={meta} />;
}

export default function EmailsPage(props) {
  const { data, pageContext } = props;
  const { allEmail } = data;
  const { title } = getMeta(props);

  return (
    <>
      <SiteHeader />

      <main>
        <PageSection component="article">
          <PageSectionBreadcrumbs
            className="mt-4"
            items={[
              { label: "Daily Gatsby Treasures", to: "/emails/" },
              { label: pageContext.tagLabel },
            ]}
          />
          <PageSectionHeader title={title} hLevel={1} />

          <Emails emails={allEmail} />
        </PageSection>

        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
}

export const query = graphql`
  query TagById($tagLabel: String!) {
    allEmail(
      sort: { order: DESC, fields: slug }
      filter: { tags: { elemMatch: { label: { eq: $tagLabel } } } }
    ) {
      nodes {
        ...EmailItemFragment
      }
    }
  }
`;

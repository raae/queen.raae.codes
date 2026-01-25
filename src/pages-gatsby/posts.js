import React from "react";
import { graphql } from "gatsby";

import PageHead from "../components/page-head";
import SiteHeader from "../components/site-header";
import PageSection, { PageSectionHeader } from "../components/page-section";
import { Newsletter } from "../components/newsletter";
import { Posts } from "../components/posts";

const BADGE = "Posts";
const TITLE = "All the posts";
const DESCRIPTION = "Posts from sailing the high seas of the World Wide Web.";

export function Head(props) {
  return (
    <PageHead
      {...props}
      meta={{ title: `${TITLE}`, description: DESCRIPTION }}
    />
  );
}

export default function PostsPage({ data }) {
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
        </PageSection>

        <PageSection component="section">
          <Posts posts={data.allPost} />
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
    allPost(sort: { slug: DESC }) {
      nodes {
        ...PostItemFragment
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";

import SiteHeader from "../components/site-header";
import PageSection, { PageSectionBreadcrumbs, PageSectionHeader } from "../components/page-section";
import PageHead from "../components/page-head";

import { Posts } from "../components/posts";
import { Newsletter } from "../components/newsletter";

const getMeta = (props) => {
  const { pageContext } = props;
  const title = `Posts tagged: "${pageContext.tagLabel}"`;
  const description = `Learn more about "${pageContext.tagLabel}" by browsing the posts for the tag.`;
  return { title, description };
};

export function Head(props) {
  const meta = getMeta(props);
  return <PageHead {...props} meta={meta} />;
}

export default function PostsPage(props) {
  const { data, pageContext } = props;
  const { allPost } = data;
  const { title } = getMeta(props);

  return (
    <>
      <SiteHeader />

      <main>
        <PageSection component="article">
          <PageSectionBreadcrumbs
            className="mt-4"
            items={[{ label: "Posts", to: "/posts/" }, { label: pageContext.tagLabel }]}
          />
          <PageSectionHeader title={title} hLevel={1} />

          <Posts posts={allPost} />
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
    allPost(sort: { slug: DESC }, filter: { tags: { elemMatch: { label: { eq: $tagLabel } } } }) {
      nodes {
        ...PostItemFragment
      }
    }
  }
`;

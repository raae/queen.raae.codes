import React from "react";
import { graphql, Link } from "gatsby";

import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionHeader,
  PageSectionBreadcrumbs,
} from "../components/page-section";

import { Newsletter } from "../content/newsletter";
import { Cta } from "../content/cta";
import Emails, { Tags } from "../content/emails";
import PageHead from "../components/page-head";

const IS_PROD = process.env.NODE_ENV === "production";

export function Head({ data, ...props }) {
  const { ogImage, title, author, description } = data.email || {};
  return (
    <PageHead
      {...props}
      meta={{
        title: title,
        description: description,
        image: ogImage,
        creator: author === "OlaVea" && "@OlaHolstVea",
      }}
    />
  );
}

export default function EmailPage({ data }) {
  const { date, ogImage, title, emojii, tags, html, relatedEmails } =
    data.email || {};

  const pitch = data.landing?.childMarkdownRemark?.frontmatter?.seo || {};
  pitch.cta = data.landing?.childMarkdownRemark?.frontmatter?.cta || {};
  pitch.cta.title = data.landing?.childMarkdownRemark?.frontmatter?.badge;
  pitch.cta.slug = data.landing?.slug;

  const emojis = emojii.split(" ");

  return (
    <>
      <SiteHeader variant="minimal" />
      <main>
        <PageSection component="article">
          <PageSectionBreadcrumbs
            items={[
              { label: "Daily Gatsby Treasures", to: "/emails/" },
              { label: date },
            ]}
          />

          <PageSectionHeader
            hLevel={1}
            title={
              <>
                {title}&nbsp;&nbsp;{emojis[0]}&nbsp;{emojis[1]}
              </>
            }
          />

          {tags && (
            <aside>
              <Tags tags={tags} />
            </aside>
          )}

          <Prose mt="3em" html={html} />

          {!IS_PROD && ogImage && (
            <Prose>
              <img src={ogImage} alt="Cover test" />
            </Prose>
          )}
        </PageSection>
        {relatedEmails?.length > 0 && (
          <PageSection>
            <PageSectionHeader
              hLevel={2}
              lead="You might also be interested in..."
            />
            <Emails emails={relatedEmails} />
          </PageSection>
        )}
        <PageSection>
          <PageSectionHeader hLevel={2} title={pitch.title} />
          <Prose mt="3em">
            <p>{pitch.description}</p>
          </Prose>
          <Cta
            {...pitch.cta}
            sx={{ mt: "2em", mr: "0.5em" }}
            note={
              <>
                or read more about{" "}
                <Link to={pitch.cta.slug}>{pitch.cta.title}</Link>
              </>
            }
          />
        </PageSection>
        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      </main>
    </>
  );
}

export const query = graphql`
  query EmailById($id: String!) {
    email(id: { eq: $id }) {
      ...EmailItemFragment
      html
      ogImage
      ... on QueenEmail {
        relatedEmails(limit: 3, titleTreshold: 0.7) {
          ...EmailItemFragment
        }
      }
    }
    landing(slug: { eq: "/gatsby-emergency/" }) {
      slug
      childMarkdownRemark {
        frontmatter {
          badge
          seo {
            description
            title
          }
          cta {
            label
            href
          }
        }
      }
    }
  }
`;

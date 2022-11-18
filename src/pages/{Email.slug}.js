import React from "react";
import { graphql, Link } from "gatsby";

import Prose from "../components/prose";
import SiteHeader from "../components/site-header";
import PageSection, {
  PageSectionHeader,
  PageSectionBreadcrumbs,
} from "../components/page-section";

import { Newsletter } from "../components/newsletter";
import { Emails } from "../components/emails";
import { Badge } from "../components/badge";
import PageHead from "../components/page-head";

const IS_PROD = process.env.NODE_ENV === "production";

export function Head({ data, ...props }) {
  const { ogImage, title, author, description, dateISO } = data.email || {};
  const { siteMetadata } = data.site || {};

  const isOla = author === "OlaVea";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: [`${siteMetadata.siteUrl}${ogImage}`],
    datePublished: dateISO,
    author: [
      {
        "@type": "Person",
        name: isOla ? "Ola Vea" : "Benedicte Raae",
        sameAs: isOla
          ? "https://twitter.com/olaholstvea"
          : "https://twitter.com/raae",
      },
    ],
  };

  const schemaAsString = JSON.stringify(schema, null, 2);

  return (
    <PageHead
      {...props}
      meta={{
        title: title,
        description: description,
        image: ogImage,
        creator: author === "OlaVea" && "@OlaHolstVea",
      }}
    >
      <script type="application/ld+json">{schemaAsString}</script>
    </PageHead>
  );
}

export default function EmailPage({ data }) {
  const { date, dateISO, ogImage, title, tags, html, relatedEmails } =
    data.email || {};

  const pitch = data.landing?.childMarkdownRemark?.frontmatter?.seo || {};
  pitch.cta = data.landing?.childMarkdownRemark?.frontmatter?.cta || {};
  pitch.cta.title = data.landing?.childMarkdownRemark?.frontmatter?.badge;
  pitch.cta.slug = data.landing?.slug;

  return (
    <>
      <SiteHeader variant="minimal" />
      <main>
        <PageSection component="article">
          <PageSectionBreadcrumbs
            items={[
              { label: "Daily Gatsby Treasures", to: "/emails/" },
              { label: <time timedate={dateISO}>{date}</time> },
            ]}
          />

          <PageSectionHeader hLevel={1} title={<>{title}</>} />

          {tags && (
            <aside>
              {tags.map(({ label, slug }) => (
                <Badge component={Link} key={label} to={slug}>
                  {label}
                </Badge>
              ))}
            </aside>
          )}

          <Prose mt="3em" html={html} />

          {!IS_PROD && ogImage && (
            <Prose>
              <img src={ogImage} alt="Cover test" />
            </Prose>
          )}
        </PageSection>
        <PageSection component="footer">
          <Newsletter
            tagline="Interested in more daily treasures like this one?"
            message={
              <>
                <br />
                Sent directly to your inbox?
              </>
            }
          />
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
        {/* <PageSection>
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
        </PageSection> */}
      </main>
    </>
  );
}

export const query = graphql`
  query EmailById($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    email(id: { eq: $id }) {
      ...EmailItemFragment
      dateISO: date
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

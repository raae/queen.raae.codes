import React from "react";
import { graphql } from "gatsby";
import { Box } from "@mui/material";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import SiteHeader from "../../components/site-header";
import PageSection, {
  PageSectionHeader,
  PageSectionBreadcrumbs,
} from "../../components/page-section";

import { Newsletter } from "../../content/newsletter";
import PageHead from "../../components/page-head";
import Talk from "../../components/talk";
import Prose from "../../components/prose";

const aggregateTalkData = (orginalTalk) => {
  const talk = {
    ...orginalTalk.childMarkdownRemark.frontmatter,
    ...orginalTalk.childMarkdownRemark,
    ...orginalTalk,
  };

  talk.gatsbyImage = getImage(talk.image);
  talk.imageSrc = talk.gatsbyImage?.images?.fallback.src;
  return talk;
};

export function Head({ data, ...props }) {
  const talk = aggregateTalkData(data.talk);
  return (
    <PageHead
      {...props}
      meta={{
        title: talk.title,
        description: talk.lead,
        image: talk.imageSrc,
        imageAlt: talk.imageAlt,
      }}
    />
  );
}

export default function TalkPage({ data }) {
  const talk = aggregateTalkData(data.talk);
  const badge = data.file.childMarkdownRemark.frontmatter.badge;
  const { gatsbyImage, imageAlt, event, form, html } = talk;

  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionBreadcrumbs
            items={[{ label: badge, to: "../" }, { label: event }]}
          />

          <PageSectionHeader hLevel={1} {...talk} />

          <Talk {...talk} />

          {gatsbyImage && (
            <Box sx={{ my: "2em" }}>
              <GatsbyImage image={gatsbyImage} alt={imageAlt} />
            </Box>
          )}
        </PageSection>
        {html && (
          <PageSection>
            <Prose mt="3em" html={html} />
          </PageSection>
        )}
        {form && (
          <PageSection component="aside">
            <Newsletter sx={{ my: "1em" }} {...form} />
          </PageSection>
        )}
      </main>
      {!form && (
        <PageSection component="footer">
          <Newsletter />
        </PageSection>
      )}
    </>
  );
}

export const query = graphql`
  query TalkById($id: String!) {
    # Archive page
    file(sourceInstanceName: { eq: "Talk" }, relativeDirectory: { eq: "" }) {
      childMarkdownRemark {
        frontmatter {
          badge
        }
      }
    }
    # The talk
    talk(id: { eq: $id }) {
      date
      childMarkdownRemark {
        html
        frontmatter {
          title
          lead
          event
          eventUrl
          recording
          imageAlt
          image {
            childImageSharp {
              gatsbyImageData(
                width: 1200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          form {
            cta
            formKey: key
            message
            tagline
          }
        }
      }
    }
  }
`;

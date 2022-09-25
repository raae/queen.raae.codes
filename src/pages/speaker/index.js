import React from "react";
import { graphql } from "gatsby";
import { Typography, Box, Button } from "@mui/material";
import { ArrowTopRightOnSquareIcon as ExternalIcon } from "@heroicons/react/20/solid";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";

import { Newsletter } from "../../content/newsletter";

import Talk from "../../components/talk";
import Prose from "../../components/prose";
import { Cta } from "../../content/cta";

const aggregateTalkData = (orginalTalk) => {
  const talk = {
    ...orginalTalk.childMarkdownRemark.frontmatter,
    ...orginalTalk.childMarkdownRemark,
    ...orginalTalk,
  };
  return talk;
};

const aggregatePageData = (data) => {
  const page = {
    ...data.file.childMarkdownRemark.frontmatter,
    ...data.file.childMarkdownRemark,
  };

  page.gatsbyImage = getImage(page.image);
  page.imageSrc = page.gatsbyImage?.images?.fallback.src;
  console.log(page.gatsbyImage, page.image);
  return page;
};

export function Head(props) {
  const page = aggregatePageData(props.data);
  return (
    <PageHead
      {...props}
      meta={{
        title: page.title,
        description: page.lead,
        image: page.imageSrc,
        imageAlt: page.imageAlt,
      }}
    />
  );
}

export default function TalksPage({ data }) {
  const page = aggregatePageData(data);
  const { html, cta, teaser, gatsbyImage, imageAlt, archive } = page;
  return (
    <>
      <SiteHeader />
      <main>
        <PageSection component="header">
          <PageSectionHeader {...page} hLevel={1} />

          <Prose html={html} />

          <Cta sx={{ mt: "2em" }} {...cta} />
        </PageSection>

        <PageSection>
          <PageSectionHeader {...teaser} />

          <Prose>
            <a href={teaser.recording}>
              <GatsbyImage image={gatsbyImage} alt={imageAlt} />
            </a>
          </Prose>

          <Typography
            variant="caption"
            color="textPrimary"
            component="a"
            href={teaser.recording}
            sx={{
              mt: "1em",
              pl: "4px",
              display: "block",
              color: "inherit",
              "&:hover": { textDecoration: "none" },
            }}
          >
            {teaser.note}
          </Typography>
        </PageSection>

        <PageSection component="section">
          <PageSectionHeader {...archive} hLevel={2} />
          {data.allTalk.nodes.map((data, index) => {
            const talk = aggregateTalkData(data);
            const { title } = talk;
            return (
              <Box key={index} sx={{ mt: "3em" }}>
                <Typography variant="h4" component="h3" gutterBottom>
                  {title}
                </Typography>
                <Talk {...talk} />
              </Box>
            );
          })}
          <Button
            href={archive.moreHref}
            component="a"
            target="_blank"
            endIcon={<ExternalIcon className="h-4 opacity-80" />}
            variant="outlined"
            fullWidth
            sx={{ mt: "2em" }}
          >
            {archive.more}
          </Button>
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
    file(sourceInstanceName: { eq: "Talk" }, relativeDirectory: { eq: "" }) {
      childMarkdownRemark {
        html
        frontmatter {
          badge
          title
          lead
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
          archive {
            title
            more
            moreHref
          }
          teaser {
            badge
            title
            recording
            note
          }
          cta {
            label
            href
            noteTitle
            note
          }
        }
      }
    }
    allTalk(sort: { order: DESC, fields: slug }) {
      nodes {
        date
        childMarkdownRemark {
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
          }
        }
      }
    }
  }
`;

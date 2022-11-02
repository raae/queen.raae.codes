import React from "react";
import { graphql } from "gatsby";
import { ArrowTopRightOnSquareIcon as ExternalIcon } from "@heroicons/react/20/solid";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import PageHead from "../../components/page-head";
import SiteHeader from "../../components/site-header";
import PageSection, { PageSectionHeader } from "../../components/page-section";
import Talk from "../../components/talk";
import Prose from "../../components/prose";
import { CtaButton, CtaSection } from "../../components/cta";
import { Newsletter } from "../../components/newsletter";

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

          <CtaSection className="mt-6" {...cta} />
        </PageSection>

        <PageSection>
          <PageSectionHeader {...teaser} />

          <Prose>
            <a href={teaser.recording}>
              <GatsbyImage image={gatsbyImage} alt={imageAlt} />
            </a>
          </Prose>

          <a
            variant="caption"
            color="textPrimary"
            className="mt-2 pl-1 block text-xs hover:decoration-amber-600 text-inherit group transition"
            href={teaser.recording}
            target="_blank"
            rel="noreferrer"
          >
            {teaser.note}

            <ExternalIcon className="h-4 ml-1.5 fill-amber-600 opacity-30 inline-block translate-y-1 transition-opacity group-hover:opacity-100" />
          </a>
        </PageSection>

        <PageSection component="section">
          <PageSectionHeader {...archive} hLevel={2} />
          {data.allTalk.nodes.map((data, index) => {
            const talk = aggregateTalkData(data);
            const { title } = talk;
            return (
              <article key={index}>
                <h3 className="mb-1 mt-9 text-lg font-extrabold">{title}</h3>
                <Talk {...talk} />
              </article>
            );
          })}
          <CtaButton href={archive.moreHref} className="mt-8 w-full">
            {archive.more}
          </CtaButton>
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

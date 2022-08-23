import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Box } from "@mui/material";

import SiteHeader from "../components/site-header";
import Seo from "../components/seo";
import PageSection, { PageSectionHeader } from "../components/page-section";
import Prose from "../components/prose";
import Testimonial from "../components/testimonial";
import Talk from "../components/talk";
import Join from "../components/join";

import Webinar from "../components/webinar";

import { Cta } from "../content/cta";
import { Newsletter } from "../content/newsletter";
import Emails from "../content/emails";
import Noteworthy from "../content/noteworthy";

const RemarkPage = ({ data, ...props }) => {
  const { childMarkdownRemark } = data.landing;
  const { frontmatter, html: pageHtml } = childMarkdownRemark || {};
  const { seo, sections, ...page } = frontmatter || {};

  const metaImage = getImage(seo?.image || page.image);

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: seo?.title || page.title,
          description: seo?.description || page.lead,
          alt: metaImage && (seo?.imageAlt || page.imageAlt),
          image: metaImage && metaImage.images.fallback.src,
        }}
      />
      <SiteHeader />
      <main>
        {(sections || []).map((section, key) => {
          let { badge, title, titlePath, lead, tagline } = section;
          let { content, element, body, testimonials } = section;
          let { image, imageAlt } = section;

          let blocks = content
            ? content.split(",").map((block) => block.trim())
            : [];

          if (blocks.length === 0) {
            if (body) {
              blocks.push("body");
            }
            if (testimonials) {
              blocks.push("testimonials");
            }
            if (image) {
              blocks.push("image");
            }
          }

          if (element === "header") {
            badge = badge || page.badge;
            title = title || page.title;
            lead = lead || page.lead;
            tagline = tagline || page.tagline;
            image = image || page.image;
            imageAlt = imageAlt || page.imageAlt;
          }

          if (blocks.includes("join")) {
            title = title || page.title;
            lead = lead || page.lead;
            tagline = tagline || page.tagline;
          }

          const gatsbyImage = getImage(image);

          const sectionHtml = body?.childMarkdownRemark?.html;

          return (
            <PageSection component={element} key={key} id={content}>
              <PageSectionHeader
                badge={badge}
                title={title}
                titlePath={titlePath}
                lead={lead}
                tagline={tagline}
                hLevel={element === "header" ? 1 : 2}
              />

              {blocks.map((block) => {
                switch (block) {
                  case "talk":
                    return <Talk key={block} {...page.talk} />;
                  case "join":
                    return <Join key={block} {...page.join} />;
                  case "webinar":
                    return <Webinar key={block} {...page.webinar} />;
                  case "main":
                    return <Prose key={block} html={pageHtml} />;
                  case "body":
                    return <Prose key={block} html={sectionHtml} />;
                  case "cta":
                    return <Cta key={block} sx={{ my: "2em" }} {...page.cta} />;
                  case "ctas":
                    return (
                      <Box sx={{ mt: "2em" }}>
                        {(page.ctas || []).map((cta) => (
                          <Cta sx={{ mt: "0.5em" }} {...cta} {...props} />
                        ))}
                      </Box>
                    );
                  case "form":
                    return (
                      <Newsletter
                        key={block}
                        sx={{ my: "1em" }}
                        {...page.form}
                      />
                    );
                  case "image":
                    return (
                      <Box sx={{ my: "2em" }} key={block}>
                        <GatsbyImage image={gatsbyImage} alt={imageAlt} />
                      </Box>
                    );
                  case "emails":
                    return <Emails key={block} more />;
                  case "noteworthy":
                    return <Noteworthy key={block} more />;
                  case "testimonials":
                    return testimonials.map((item, key) => {
                      const { frontmatter, html } = item.childMarkdownRemark;
                      return (
                        <Testimonial
                          sx={{ my: "2em" }}
                          key={`testimonial-${key}`}
                          {...frontmatter}
                        >
                          <Prose html={html} />
                        </Testimonial>
                      );
                    });

                  default:
                    return null;
                }
              })}
            </PageSection>
          );
        })}
      </main>
    </>
  );
};

export default RemarkPage;

export const query = graphql`
  query LandingById($id: String!) {
    landing(id: { eq: $id }) {
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
          seo {
            title
            description
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
          cta {
            href
            label
            noteTitle
            note
          }
          ctas {
            to
            label
          }
          talk {
            date
            url
            recording
            event
          }
          webinar {
            date
            url
          }
          form {
            cta
            formKey: key
            message
            tagline
          }
          join {
            start
            end
            deadline
            paymentLink
            price
            status
          }
          sections {
            element
            badge
            title
            titlePath

            tagline
            content
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
            body {
              childMarkdownRemark {
                html
              }
            }
            testimonials {
              childMarkdownRemark {
                frontmatter {
                  who
                  url
                  attended
                  company {
                    name
                    url
                  }
                  avatar {
                    childImageSharp {
                      gatsbyImageData(
                        width: 200
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                      )
                    }
                  }
                }
                html
              }
            }
          }
        }
      }
    }
  }
`;

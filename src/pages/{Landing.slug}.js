import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import SiteHeader from "../components/site-header";
import PageHead from "../components/page-head";
import PageSection, { PageSectionHeader } from "../components/page-section";
import Prose from "../components/prose";
import Testimonial from "../components/testimonial";
import Talk from "../components/talk";
import Join from "../components/join";

import Webinar from "../components/webinar";

import { Cta } from "../components/cta";
import { Newsletter } from "../components/newsletter";
import { Emails } from "../components/emails";
import Noteworthy from "../components/noteworthy";

export function Head({ data, ...props }) {
  const { childMarkdownRemark } = data.landing;
  const { frontmatter } = childMarkdownRemark || {};
  const { seo, sections, ...page } = frontmatter || {};

  const metaImage = getImage(seo?.image || page.image);
  return (
    <PageHead
      {...props}
      meta={{
        title: seo?.title || page.title,
        description: seo?.description || page.lead,
        alt: metaImage && (seo?.imageAlt || page.imageAlt),
        image: metaImage && metaImage.images.fallback.src,
      }}
    />
  );
}

export default function RemarkPage({ data, ...props }) {
  const { childMarkdownRemark } = data.landing;
  const { frontmatter, html: pageHtml } = childMarkdownRemark || {};
  const { sections, ...page } = frontmatter || {};

  return (
    <>
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
                    return <Cta key={block} className="mt-6" {...page.cta} />;
                  case "ctas":
                    return (
                      <div className="mt-6 space-y-3">
                        {(page.ctas || []).map((cta) => (
                          <Cta {...cta} {...props} />
                        ))}
                      </div>
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
                      <GatsbyImage
                        className="pt-8"
                        image={gatsbyImage}
                        alt={imageAlt}
                        key={block}
                      />
                    );
                  case "emails":
                    return <Emails key={block} more className="mt-12" />;
                  case "noteworthy":
                    return <Noteworthy key={block} more className="mt-12" />;
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
}

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
            lead
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

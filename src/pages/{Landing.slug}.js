import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";

import Seo from "../components/seo";
import Prose from "../components/prose";
import Testimonial from "../components/testimonial";
import Talk from "../components/talk";
import Join from "../components/join";
import NewsletterForm from "../components/newsletter";
import Webinar from "../components/webinar";

const CtaContent = ({ path, label }) => {
  if (!path || !label) return null;

  return (
    <h4>
      <a href={path}>{label}</a>
    </h4>
  );
};

const RemarkPage = ({ data, ...props }) => {
  const { childMarkdownRemark } = data.landing;
  const { frontmatter, html: pageHtml } = childMarkdownRemark || {};
  const { cta, talk, seo, join, form, webinar, ...page } = frontmatter || {};
  const { sections } = frontmatter || {};

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
      <main>
        {(sections || []).map((section, key) => {
          let { badge, title, lead, tagline } = section;
          let { content, element, body, testimonials } = section;
          let { image, imageAlt } = section;

          content = content || "";

          if (element === "header") {
            badge = badge || page.badge;
            title = title || page.title;
            lead = lead || page.lead;
            tagline = tagline || page.tagline;
            image = image || page.image;
            imageAlt = imageAlt || page.imageAlt;
          }

          if (content.includes("join")) {
            title = title || page.title;
            lead = lead || page.lead;
            tagline = tagline || page.tagline;
          }

          const gatsbyImage = getImage(image);
          const Element = element || "section";
          const TitleElement = element === "header" ? "h1" : "h2";
          const sectionHtml = body?.childMarkdownRemark?.html;

          return (
            <Element key={key} id={content}>
              {badge && (
                <small>
                  <mark>{badge}</mark>
                </small>
              )}
              {title && <TitleElement>{title}</TitleElement>}
              {lead && <p className="lead">{lead}</p>}
              {tagline && (
                <p>
                  <em>{tagline}</em>
                </p>
              )}

              {content.includes("talk") && <Talk {...talk} />}

              {content.includes("join") && <Join {...join} />}

              {content.includes("webinar") && <Webinar {...webinar} />}

              {sectionHtml && <Prose html={sectionHtml} />}

              {content.includes("main") && <Prose html={pageHtml} />}

              {testimonials &&
                testimonials.map((item, key) => {
                  const { frontmatter, html } = item.childMarkdownRemark;
                  return (
                    <Testimonial key={key} {...frontmatter}>
                      <div dangerouslySetInnerHTML={{ __html: html }} />
                    </Testimonial>
                  );
                })}

              {content.includes("cta") && <CtaContent {...cta} />}

              {content.includes("form") && <NewsletterForm {...form} />}

              {image && <GatsbyImage image={gatsbyImage} alt={imageAlt} />}
            </Element>
          );
        })}
      </main>

      <footer>
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </footer>
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
          tagline
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
            path
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

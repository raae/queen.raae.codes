import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Seo from "../components/seo";
import NewsletterSection from "../content/newsletter-section";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import TestimonialsSection from "../content/testimonials-section";
import SocialLinks from "../content/social-links";
import TalkIntro from "../content/talk-intro";
import BootcampIntro from "../content/bootcamp-intro";
import BootcampBuy from "../content/bootcamp-buy";
import QueenPhoto from "../components/queen-photo";
import WebinarIntro from "../content/webinar-intro";

const RemarkPage = ({ data, ...props }) => {
  const { childMarkdownRemark } = data.landing;
  const {
    frontmatter: {
      cover,
      title,
      description,
      bootcamp,
      talk,
      webinar,
      subscription,
      testimonials,
    },
    html,
  } = childMarkdownRemark;

  const coverImage = getImage(cover?.src);
  const coverAlt = cover?.alt;
  const CoverImage = coverImage ? (
    <GatsbyImage image={coverImage} alt={coverAlt} />
  ) : null;

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description,
          alt: coverImage && cover?.alt,
          image: coverImage && coverImage.images.fallback.src,
        }}
      />
      <main>
        <header>
          {bootcamp && <BootcampIntro title={title} {...bootcamp} />}

          {talk && (
            <TalkIntro title={title} CoverImage={CoverImage} {...talk} />
          )}

          {webinar && <WebinarIntro title={title} {...webinar} />}

          {!bootcamp && !talk && !webinar && (
            <>
              <h1>{title}</h1>
              {CoverImage}
            </>
          )}

          {subscription && <NewsletterForm {...subscription} />}
        </header>

        {testimonials && bootcamp && (
          <TestimonialsSection skipIntro {...testimonials} />
        )}

        <div dangerouslySetInnerHTML={{ __html: html }} />

        {bootcamp && (
          <section>
            <QueenPhoto />
          </section>
        )}

        {testimonials && <TestimonialsSection {...testimonials} />}

        {bootcamp && <BootcampBuy title={title} {...bootcamp} />}
      </main>

      <footer>
        {subscription && (
          <NewsletterForm {...subscription} anchor="signup">
            <p>{subscription.message}</p>
          </NewsletterForm>
        )}

        {!subscription && !bootcamp && <NewsletterSection />}

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
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          description
          cover {
            src {
              childImageSharp {
                gatsbyImageData(
                  width: 1200
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            alt
          }
          talk {
            date
            url
            event
            recording
            type
            tags
          }
          webinar {
            date
            url
          }
          bootcamp {
            outcome
            location
            tags
            start
            end
            payment_link
            price
            deadline
          }
          subscription {
            cta
            formKey
            message
          }
          testimonials {
            title
            intro
            items {
              childMarkdownRemark {
                frontmatter {
                  who
                  attended
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

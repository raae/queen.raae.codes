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

const RemarkPage = ({ data, ...props }) => {
  const post = data.markdownRemark;
  const { cover, title, description } = post.frontmatter;
  const { bootcamp, talk } = post.frontmatter;
  const { subscription, testimonials } = post.frontmatter;

  const coverImage = getImage(cover?.src);
  const coverAlt = cover?.alt;
  const CoverImage = <GatsbyImage image={coverImage} alt={coverAlt} />;

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

          {!bootcamp && !talk && (
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

        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <section>{bootcamp && <QueenPhoto />}</section>

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
  query MarkdownBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
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
          items
        }
      }
    }
  }
`;

import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../templates/default";
import Seo from "../components/seo";
import NewsletterSection from "../content/newsletter-section";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import TestimonialsSection from "../content/testimonials-section";
import SocialLinks from "../content/social-links";
import TalkMeta from "../components/talk-meta";

const RemarkPage = ({ data, ...props }) => {
  const post = data.markdownRemark;
  const { cover, title, subscription, talk, testimonials } = post.frontmatter;
  const gatsbyCover = getImage(cover?.src);

  return (
    <Layout>
      <Seo
        {...props}
        meta={{
          title: title,
          alt: gatsbyCover && cover?.alt,
          image: gatsbyCover && gatsbyCover.images.fallback.src,
        }}
      />
      <main>
        {title && (
          <header>
            <h1>{post.frontmatter.title}</h1>
            {talk && <TalkMeta {...talk} />}

            {gatsbyCover && (
              <GatsbyImage image={gatsbyCover} alt={cover?.alt} />
            )}

            {subscription && <NewsletterForm {...subscription} />}
          </header>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        {testimonials && <TestimonialsSection {...testimonials} />}
      </main>

      <footer>
        {subscription ? (
          <NewsletterForm {...subscription} anchor="signup">
            <p>{subscription.message}</p>
          </NewsletterForm>
        ) : (
          <NewsletterSection />
        )}
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </footer>
    </Layout>
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
        subscription {
          cta
          formKey
          message
        }
        testimonials {
          title
          intro
          list {
            who
            testimonial
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
        }
      }
    }
  }
`;

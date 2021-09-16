import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../templates/default";
import Seo from "../components/seo";
import NewsletterSection from "../content/newsletter-section";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";

const PageTemplate = ({ data, ...props }) => {
  const post = data.markdownRemark;
  const { cover, alt, title, subscription, testimonials } = post.frontmatter;
  const gatsbyCover = getImage(cover);

  return (
    <Layout>
      <Seo
        {...props}
        meta={{
          title: title,
          alt: gatsbyCover && alt,
          image: gatsbyCover && gatsbyCover.images.fallback.src,
        }}
      />
      <main>
        {title && (
          <header>
            <h1>{post.frontmatter.title}</h1>

            {gatsbyCover && (
              <GatsbyImage image={gatsbyCover} alt={post.frontmatter.title} />
            )}
            {subscription && (
              <NewsletterForm
                subscription={subscription.key}
                cta={subscription.cta}
              />
            )}
          </header>
        )}

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        {testimonials && (
          <section>
            <h2>{testimonials.title}</h2>
            <p>{testimonials.intro}</p>
            {testimonials.list.map(({ testimonial, who, avatar }) => (
              <blockquote key={who}>
                <GatsbyImage image={getImage(avatar)} alt={who} />
                <p>
                  {testimonial}
                  <cite>{who}</cite>
                </p>
              </blockquote>
            ))}
          </section>
        )}
      </main>

      <footer>
        {subscription ? (
          <section id="signup">
            <NewsletterForm
              subscription={subscription.key}
              cta={subscription.cta}
            >
              <p>{subscription.message}</p>
            </NewsletterForm>
          </section>
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

export default PageTemplate;

export const query = graphql`
  query PageBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
        alt
        subscription {
          cta
          key
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

import React from "react";
import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import NewsletterForm from "../components/newsletter";

import Seo from "../components/seo";
import Prose from "../components/prose";

const IS_PROD = process.env.NODE_ENV === "production";

const QueenEmail = ({ data, ...props }) => {
  const { date, ogImage, childMarkdownRemark } = data.email || {};
  const { frontmatter, html, excerpt } = childMarkdownRemark || {};
  const { title, emojii, description } = frontmatter || {};

  const ogGatsbyImage = getImage(ogImage);
  const ogImageSrc = ogGatsbyImage?.images?.fallback?.src;

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description || excerpt,
          image: ogImageSrc,
        }}
      />

      <main>
        <header>
          {title && (
            <h1>
              {title}&nbsp;&nbsp;
              {emojii}
            </h1>
          )}
          <small>
            An <Link to="/emails/">email</Link> sent on {date}
          </small>
        </header>

        <Prose html={html} />

        <section>
          <NewsletterForm>
            <strong>Serious about Gatsby?</strong> Sign up for emails like this
            from Queen Raae (and Cap'n Ola) sent every weekday to help you get
            the most out of Gatsby!
          </NewsletterForm>
        </section>

        {!IS_PROD && (
          <section>
            <img src={ogImageSrc} alt="Cover test" />
          </section>
        )}
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

export default QueenEmail;

export const query = graphql`
  query QueenEmailById($id: String!) {
    email: queenEmail(id: { eq: $id }) {
      ogImage {
        childImageSharp {
          gatsbyImageData(formats: NO_CHANGE)
        }
      }
      date(formatString: "MMMM Do, YYYY")
      childMarkdownRemark {
        excerpt(pruneLength: 160)
        html
        frontmatter {
          title
          emojii
          description
        }
      }
    }
  }
`;

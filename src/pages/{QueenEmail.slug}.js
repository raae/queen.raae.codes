import React from "react";
import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Seo from "../components/seo";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import NewsletterSection from "../content/newsletter-section";

const IS_PROD = process.env.NODE_ENV === "production";

const QueenEmail = ({ data, ...props }) => {
  const { date, ogImage, childMarkdownRemark } = data.email;
  const {
    frontmatter: { title, description },
    html,
    excerpt,
  } = childMarkdownRemark;

  const ogGatsbyImage = getImage(ogImage);
  const ogImageSrc = ogGatsbyImage?.images?.fallback?.src;

  const body = `<p>Hello there, </p>` + html;

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
        {!IS_PROD && (
          <section>
            <img src={ogImageSrc} alt="Cover test" />
          </section>
        )}

        <header>
          <h1>{title}</h1>
          <small>
            An <Link to="/emails/">email</Link> sent by{" "}
            <strong>Queen Raae</strong>&nbsp;👑 on {date}
          </small>
        </header>

        <div dangerouslySetInnerHTML={{ __html: body }} />
      </main>

      <footer>
        <NewsletterSection />
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
          description
        }
      }
    }
  }
`;

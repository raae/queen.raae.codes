import React from "react";
import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

import Seo from "../components/seo";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";

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
            An <Link to="/emails">email</Link> sent by{" "}
            <Link to="/">Queen Raae</Link>&nbsp;👑 on {date}
          </small>
        </header>

        <div dangerouslySetInnerHTML={{ __html: body }} />

        <section>
          <NewsletterForm formKey="queen">
            <p>
              I send emails like this one to{" "}
              <strong>help you get the most out of Gatsby</strong> multiple
              times a week. Sign up to get them delivered to your inbox.
            </p>
          </NewsletterForm>
        </section>
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
          description
        }
      }
    }
  }
`;

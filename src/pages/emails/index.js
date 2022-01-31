import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../../components/seo";

import MainMenu from "../../content/main-menu";
import SocialLinks from "../../content/social-links";
import NewsletterSection from "../../content/newsletter-section";

const Emails = ({ data, ...props }) => {
  return (
    <>
      <Seo {...props} meta={{ title: "Emails from the Queen" }} />
      <main>
        <header>
          <h1>
            Emails from{" "}
            <span>
              yours truly{" "}
              <span role="img" aria-label="Envelope with heart">
                💌
              </span>
            </span>
          </h1>
        </header>

        <section>
          <NewsletterSection />
        </section>
        <section>
          <ul>
            {data.allEmail.nodes.map(
              ({
                date,
                slug,
                childMarkdownRemark: {
                  frontmatter: { title },
                },
              }) => (
                <li key={slug}>
                  <small>{date}</small>
                  <br />
                  <Link to={slug}>{title}</Link>
                </li>
              )
            )}
          </ul>
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

export const query = graphql`
  {
    allEmail: allQueenEmail(sort: { order: DESC, fields: date }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
          }
        }
        slug
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export default Emails;

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
            💌&nbsp;&nbsp;&nbsp;Queen Raae's Daily List&nbsp;&nbsp;&nbsp;💌
          </h1>
        </header>

        <NewsletterSection />

        <section>
          <ul>
            {data.allEmail.nodes.map(
              ({
                date,
                slug,
                childMarkdownRemark: {
                  frontmatter: { title, emojii },
                },
              }) => (
                <li key={slug}>
                  <small>
                    {emojii || "⛵ 🔧"}&nbsp;&nbsp;{date}
                  </small>
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
    allEmail(sort: { order: DESC, fields: slug }) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            title
            emojii
          }
        }
        slug
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export default Emails;

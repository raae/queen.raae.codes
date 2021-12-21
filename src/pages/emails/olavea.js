import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../../components/seo";

import MainMenu from "../../content/main-menu";
import SocialLinks from "../../content/social-links";
import NewsletterForm from "../../components/newsletter";

const Emails = ({ data, ...props }) => {
  return (
    <>
      <Seo {...props} meta={{ title: "Emails from Piraty Captain Ola" }} />
      <main>
        <header>
          <h1>
            Emails from{" "}
            <span>
              Piraty Captain Ola{" "}
              <span
                role="img"
                aria-label="Pirate flag + Sailboat + Wrench emoji"
              >
                &nbsp; 🏴‍☠️ ⛵ 🔧
              </span>
            </span>
          </h1>
        </header>

        <section>
          <NewsletterForm subscription="olavea" cta="Sign up">
            <p>
              Follow along as Piraty Captain Ola builds his{" "}
              <strong>Gatsby skillz</strong> and make sure to set up your own
              skillbuilding practice as well.
            </p>
          </NewsletterForm>
        </section>
        <section>
          <ul>
            {data.allOlaVeaEmails.nodes.map(
              ({ fields: { date, slug }, frontmatter: { title } }) => (
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
    allOlaVeaEmails: allMarkdownRemark(
      filter: { fields: { slug: { glob: "/emails/olavea/*" } } }
      sort: { fields: fields___date, order: DESC }
    ) {
      nodes {
        fields {
          slug
          date(formatString: "MMMM Do, YYYY")
        }
        frontmatter {
          title
        }
      }
    }
  }
`;

export default Emails;

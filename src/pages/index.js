import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../components/seo";

import NewsletterSection from "../content/newsletter-section";
import EventsSection from "../content/events-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";
import SocialLinks from "../content/social-links";
import MainMenu from "../content/main-menu";

const IndexPage = ({ data, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <main>
        <HomeHeader />

        <EventsSection />

        <AboutSection />

        <section>
          <h2>
            <Link to="/emails">Emails from yours truly 💌</Link>
          </h2>
          <ul>
            {data.allEmails.nodes.map(
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
        <NewsletterSection />
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
    allEmails: allMarkdownRemark(
      filter: { fields: { slug: { glob: "/emails/*" } } }
      sort: { fields: fields___date, order: DESC }
      limit: 5
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

export default IndexPage;

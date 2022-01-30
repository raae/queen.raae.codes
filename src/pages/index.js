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
    allEmails: allQueenEmail(sort: { order: DESC, fields: date }, limit: 5) {
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

export default IndexPage;

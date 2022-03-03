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

        <section>
          <ul>
            {data.allEmail.nodes.map(({ date, slug, title, emojii }) => (
              <li key={slug}>
                <small>
                  {emojii}&nbsp;&nbsp;{date}
                </small>
                <br />
                <Link to={slug}>{title}</Link>
              </li>
            ))}
            <li>
              <Link to="/emails/">More emails...</Link>
            </li>
          </ul>
        </section>

        <NewsletterSection />

        <EventsSection />

        <AboutSection />

        <NewsletterSection />
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
    allEmail(sort: { order: DESC, fields: date }, limit: 5) {
      nodes {
        title
        emojii
        slug
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export default IndexPage;

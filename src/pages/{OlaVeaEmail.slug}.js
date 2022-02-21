import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../components/seo";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import NewsletterSection from "../content/newsletter-section";

const OlaVeaEmail = ({ data, ...props }) => {
  const { date, childMarkdownRemark } = data.email;
  const {
    frontmatter: { title, description },
    html,
    excerpt,
  } = childMarkdownRemark;

  const body = `<p>Ship Ahoy Skill Builder! </p>` + html;

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description || excerpt,
        }}
      />
      <main>
        <header>
          <h1>{title}</h1>
          <small>
            An <Link to="/emails/">email</Link> sent by{" "}
            <strong>Cap'n Ola</strong> on {date}
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

export default OlaVeaEmail;

export const query = graphql`
  query OlaVeaEmailById($id: String!) {
    email: olaVeaEmail(id: { eq: $id }) {
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

import React from "react";
import { graphql, Link } from "gatsby";

import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import NewsletterForm from "../components/newsletter";

import Seo from "../components/seo";
import Prose from "../components/prose";

const OlaVeaEmail = ({ data, ...props }) => {
  const { date, childMarkdownRemark } = data.email;
  const {
    frontmatter: { title, description },
    html,
    excerpt,
  } = childMarkdownRemark;

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
          <h1>{title} ⛵ 🔧</h1>
          <small>
            An <Link to="/emails/">email</Link> sent on {date}
          </small>
        </header>

        <Prose html={`<p>Ship Ahoy Skill Builder! </p>` + html} />

        <section>
          <NewsletterForm>
            <strong>Serious about Gatsby?</strong> Sign up for emails like this
            from Cap'n Ola (and Queen Raae) sent every weekday to help you get
            the most out of Gatsby!
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

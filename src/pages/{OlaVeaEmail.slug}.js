import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../components/seo";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";

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
            An <Link to="/emails/olavea/">email</Link> sent by{" "}
            <Link to="/emails/olavea/">Gatsby Piraty Captain</Link> on {date}
          </small>
        </header>

        <div dangerouslySetInnerHTML={{ __html: body }} />

        <section>
          <NewsletterForm formKey="olavea" cta="Subscribe">
            <p>
              I send emails like this one to keep up with my{" "}
              <strong>Gatsby Skillbuilding</strong> once a week. Sign up to get
              them delivered to your inbox.
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

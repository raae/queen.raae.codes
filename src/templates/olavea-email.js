import React from "react";
import { graphql, Link } from "gatsby";

import Seo from "../components/seo";
import NewsletterForm from "../components/newsletter";
import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";

const RemarkPage = ({ data, ...props }) => {
  const post = data.markdownRemark;
  const { title } = post.frontmatter;
  const { date } = post.fields;

  const body = `<p>Ship Ahoy Skill Builder! </p>` + post.html;

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: post.excerpt,
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

export default RemarkPage;

export const query = graphql`
  query OlaEmailById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

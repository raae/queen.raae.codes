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

  const body = `<p>Hello there, </p>` + post.html;

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
            An <Link to="/emails">email</Link> sent by{" "}
            <Link to="/">Queen Raae</Link>&nbsp;👑 on {date}
          </small>
        </header>

        <div dangerouslySetInnerHTML={{ __html: body }} />

        <section>
          <NewsletterForm formKey="queen">
            <p>
              I send emails like this one to{" "}
              <strong>help you get the most out of Gatsby</strong> multiple
              times a week. Sign up to get them delivered to your inbox.
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
  query EmailById($id: String!) {
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

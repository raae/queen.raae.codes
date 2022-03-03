import React from "react";
import { graphql, Link } from "gatsby";

import MainMenu from "../content/main-menu";
import SocialLinks from "../content/social-links";
import NewsletterForm from "../components/newsletter";

import Seo from "../components/seo";
import Prose from "../components/prose";

const OlaVeaEmail = ({ data, ...props }) => {
  const { date, title, emojii, description, html } = data.email || {};

  return (
    <>
      <Seo
        {...props}
        meta={{
          title: title,
          description: description,
        }}
      />
      <main>
        <header>
          {title && (
            <h1>
              {title}&nbsp;&nbsp;
              {emojii}
            </h1>
          )}
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
      title
      emojii
      description
      html
      date(formatString: "MMMM Do, YYYY")
    }
  }
`;

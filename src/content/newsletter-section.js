import React from "react";
import NewsletterForm from "../components/newsletter";

const NewsletterSection = ({ children }) => {
  return (
    <section>
      <NewsletterForm cta="Yes please!">
        <p>
          <strong>Serious about Gatsby?</strong> Sign up for emails from Queen
          Raae (and Cap'n Ola) sent every weekday to help you get the most out
          of Gatsby!
        </p>
      </NewsletterForm>
      {children}
    </section>
  );
};

export default NewsletterSection;

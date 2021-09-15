import React from "react";
import NewsletterForm from "../components/newsletter";

const NewsletterSection = () => {
  return (
    <section>
      <NewsletterForm>
        <p>
          Get notified about up-coming plugins, workshops, streams and future
          articles to <strong>help you get the most out of Gatsby</strong> by
          signing up for emails from yours&nbsp;truly.
        </p>
      </NewsletterForm>
    </section>
  );
};

export default NewsletterSection;

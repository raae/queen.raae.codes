import React from "react";
import NewsletterForm from "../components/newsletter";

const NewsletterSection = () => {
  return (
    <section>
      <NewsletterForm cta="Stay updated">
        <p>
          Stay updated on plugins, bootcamps, streams etc. to{" "}
          <strong>help you get the most out of Gatsby</strong> by signing up for
          emails from yours&nbsp;truly.
        </p>
      </NewsletterForm>
    </section>
  );
};

export default NewsletterSection;

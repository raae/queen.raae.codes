import React from "react";
import { Link } from "gatsby";

import Seo from "../components/seo";

import DefaultLayout from "../templates/default";
import SocialLinks from "../content/social-links";
import NewsletterSection from "../content/newsletter-section";

const NotFoundPage = (props) => {
  return (
    <DefaultLayout>
      <Seo {...props} meta={{ title: "Not found" }} />

      <header>
        <h1>
          Sorry{" "}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{" "}
          we couldn’t find what you were looking for.
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <SocialLinks />
        </nav>
      </header>

      <section>
        <img src="https://http.cat/404" alt="Cat hiding, but clearly visible" />
      </section>

      <NewsletterSection />
    </DefaultLayout>
  );
};

export default NotFoundPage;

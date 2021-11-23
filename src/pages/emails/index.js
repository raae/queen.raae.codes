import React from "react";

import Seo from "../../components/seo";

import MainMenu from "../../content/main-menu";
import SocialLinks from "../../content/social-links";
import NewsletterSection from "../../content/newsletter-section";

const Emails = (props) => {
  return (
    <>
      <Seo {...props} meta={{ title: "Emails from the Queen" }} />
      <main>
        <header>
          <h1>
            Emails from{" "}
            <span>
              yours truly{" "}
              <span role="img" aria-label="Envolope with heart">
                💌
              </span>
            </span>
          </h1>
        </header>

        <section>
          <NewsletterSection />
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

export default Emails;

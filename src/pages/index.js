import React from "react";

import Seo from "../components/seo";

import NewsletterSection from "../content/newsletter-section";
import EventsSection from "../content/events-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";
import SocialLinks from "../content/social-links";
import MainMenu from "../content/main-menu";

const IndexPage = (props) => {
  return (
    <>
      <Seo {...props} />
      <main>
        <HomeHeader />

        <EventsSection />

        <AboutSection />
      </main>
      <footer>
        <NewsletterSection />
        <nav>
          <MainMenu />
          <SocialLinks />
        </nav>
      </footer>
    </>
  );
};

export default IndexPage;

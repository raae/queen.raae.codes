import React from "react";

import Layout from "../templates/default";
import Seo from "../components/seo";

import NewsletterSection from "../content/newsletter-section";
import EventsSection from "../content/events-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";

const IndexPage = (props) => {
  return (
    <Layout>
      <Seo {...props} />
      <main>
        <HomeHeader />

        <NewsletterSection />

        <EventsSection />

        <AboutSection />
      </main>
      <footer>
        <NewsletterSection />
      </footer>
    </Layout>
  );
};

export default IndexPage;

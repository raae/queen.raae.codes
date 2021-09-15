import React from "react";
import Layout from "../components/layout";
import NewsletterSection from "../content/newsletter-section";
import UpcomingSection from "../content/upcoming-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";

const IndexPage = () => {
  return (
    <Layout>
      <HomeHeader />

      <NewsletterSection />

      <UpcomingSection />

      <AboutSection />

      <NewsletterSection />
    </Layout>
  );
};

export default IndexPage;

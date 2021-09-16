import React from "react";

import RootLayout from "../templates/root";
import Seo from "../components/seo";

import NewsletterSection from "../content/newsletter-section";
import UpcomingSection from "../content/upcoming-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";

const IndexPage = (props) => {
  console.log({ props });
  return (
    <RootLayout>
      <Seo {...props} />
      <HomeHeader />

      <NewsletterSection />

      <UpcomingSection />

      <AboutSection />
    </RootLayout>
  );
};

export default IndexPage;

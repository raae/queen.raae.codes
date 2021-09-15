import React from "react";

import DefaultLayout from "../templates/default";
import Seo from "../components/seo";

import NewsletterSection from "../content/newsletter-section";
import UpcomingSection from "../content/upcoming-section";
import AboutSection from "../content/about-section";
import HomeHeader from "../content/home-header";

const IndexPage = (props) => {
  console.log({ props });
  return (
    <DefaultLayout>
      <Seo {...props} />
      <HomeHeader />

      <NewsletterSection />

      <UpcomingSection />

      <AboutSection />

      <NewsletterSection />
    </DefaultLayout>
  );
};

export default IndexPage;

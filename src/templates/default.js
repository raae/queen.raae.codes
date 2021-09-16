import React from "react";
import MainMenu from "../content/main-menu";

import NewsletterSection from "../content/newsletter-section";
import SocialLinks from "../content/social-links";
import RootLayout from "./root";

const DefaultLayout = ({ children, ...props }) => {
  return <RootLayout {...props}>{children}</RootLayout>;
};

export default DefaultLayout;

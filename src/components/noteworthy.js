import React from "react";
import { ContentList } from "./content-list";

const Noteworthy = ({ upcoming = UPCOMING, more, ...props }) => {
  const items = upcoming.map(({ title, details, ...rest }) => {
    return {
      primary: title,
      secondary: details,
      ...rest,
    };
  });

  const ctas = [
    { href: "https://www.crowdcast.io/raae", label: "More webinars" },
    { href: "https://www.youtube.com/QueenRaae", label: " More streams" },
  ];

  return <ContentList items={items} ctas={more && ctas} {...props} />;
};

export default Noteworthy;

const UPCOMING = [
  {
    title:
      "Unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands",
    details: "YouTube Live Stream · Thursdays at 19:00 CET",
    href: "https://www.youtube.com/QueenRaae",
  },
  {
    title:
      "Add Flexibility to Your Site with Gatsby Functions — learn how to charge money with Stripe and send emails with SendGrid",
    details: "Lightning talk · Gatsby Fall Camp '21",
    to: "/speaker/2021-09-16-gatsby-fall-camp/",
  },
  {
    title:
      "TDD + Gatsby Serverless Functions — learn how to get started with Test Driven Development (TDD)",
    details: "Free webinar with Mirjam and Queen Raae",
    href: "https://www.crowdcast.io/e/testing-your-functions/",
  },
  {
    title:
      "A practical introduction to Gatsby Serverless Functions — learn the basic of Gatsby Functions",
    details: "Free webinar with Queen Raae",
    href: "https://www.crowdcast.io/e/a-practical-introduction/",
  },
  {
    title:
      "Architecting your Gatsby Functions — learn how to split your function into smaller functions",
    details: "Free webinar with Swizec and Queen Raae",
    href: "https://www.crowdcast.io/e/architecturing-your/",
  },
];

import React from "react";
import { Link } from "gatsby";

const EventsSection = ({ upcoming = UPCOMING }) => {
  return (
    <section>
      <ul>
        {upcoming.map(
          ({ path, href, title, what, details, date, mark }, index) => (
            <li key={index}>
              {path && <Link to={path}>{title}</Link>}
              {href && <a href={href}>{title}</a>}
              {!href && !path && <strong>{title}</strong>}
              <br />
              {what} {details && <em>— {details}</em>}
              <br />
              <small>
                {date}{" "}
                {mark && (
                  <>
                    {path && (
                      <Link to={path}>
                        <mark>{mark}</mark>
                      </Link>
                    )}
                    {href && (
                      <a href={href}>
                        <mark>{mark}</mark>
                      </a>
                    )}
                  </>
                )}
              </small>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

export default EventsSection;

const UPCOMING = [
  {
    title: "Stuck on a reef in the sharky waters around the Gatsby islands?",
    what: "Gatsby Emergency Call",
    details: "Speak with a seasoned Gatsby developer and get unstuck!",
    mark: "Two slots a week",
    path: "/gatsby-emergency/",
  },
  {
    title: "Gatsby Show with Queen Raae + Pirates",
    what: "YouTube Live Stream",
    details:
      "our weekly unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands.",
    mark: "Every Thursday at 19:00 CET",
    href: "https://www.youtube.com/QueenRaae",
  },
  {
    title: "Live Screencasts with Queen Raae",
    what: "YouTube Live Stream",
    details: "Learn how to get the most out of Gatsby",
    date: "Once a month",
    href: "https://www.youtube.com/QueenRaae",
  },
  {
    title: "5 Gatsby Gotchas to look out for as React developer",
    what: "Webinar",
    details: "Learn how to work with, not against the framework",
    date: "Tuesday February 7th at 19:00 CET",
    href: "https://www.crowdcast.io/e/gatsby-gotchas-react",
  },
  {
    title: "Add Flexibility to Your Site with Gatsby Functions",
    what: "Lightning talk at Gatsby Fall Camp '21",
    details:
      "learn how to charge money with Stripe and send emails with SendGrid",
    path: "/gatsby-fall-camp-2021/",
    // mark: "Replay available",
  },
  {
    title: "TDD + Gatsby Serverless Functions",
    what: "Free webinar recording",
    details:
      "Mirjam shows us how to get started with Test Driven Development (TDD)",
    // date: "November 2nd at 20:00 CEST",
    href: "https://www.crowdcast.io/e/testing-your-functions/",
    // mark: "Replay available",
  },
  {
    title: "A practical introduction to Gatsby Serverless Functions",
    what: "Free webinar recording",
    details: "learn the basic of serverless.",
    href: "https://www.crowdcast.io/e/a-practical-introduction/",
    // mark: "Replay available",
  },
  {
    title: "Architecting your Gatsby Serverless Functions with Swizec Teller",
    what: "Free webinar recording",
    details: "learn how to split your function into smaller functions.",
    href: "https://www.crowdcast.io/e/architecturing-your/",
    // mark: "Replay available",
  },
  {
    title: "Get pratical experience with SSR vs. SSG vs. DSR",
    what: "Gatsby Mini Bootcamp",
    details:
      "a webinar + q&a session + forum + co-working + code sample combo.",
    date: "To be scheduled",
    path: "/gatsby-bootcamps/v4/",
  },
  {
    title: "Develop and Deploy your first Serverless Function",
    what: "Gatsby Mini Bootcamp",
    details:
      "a webinar + q&a session + forum + co-working + code sample combo.",
    date: "To be scheduled",
    path: "/gatsby-bootcamps/first-function/",
    // mark: "Starts this weekend!",
  },
  {
    title: "Develop and deploy a pay-what-you-want feature with Stripe",
    what: "Gatsby Mini Bootcamp",
    details:
      "a webinar + q&a session + forum + co-working + code sample combo.",
    date: "To be scheduled",
    path: "/gatsby-bootcamps/payment/",
    // mark: "Registrer",
  },
];

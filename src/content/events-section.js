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
                  <Link to={path}>
                    <mark>{mark}</mark>
                  </Link>
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
    title: "Develop and Deploy your first Serverless Function",
    what: "Gatsby Mini Bootcamp",
    details:
      "a webinar + q&a session + forum + co-working + code sample combo.",
    date: "November 6th - 13th",
    path: "/gatsby-bootcamps/first-function",
    mark: "Sign up today!",
  },
  {
    title: "Gatsby Deep Dives with Queen Raae and the Nattermob Pirates",
    what: "YouTube live show",
    details:
      "our weekly rum-fueled treasure hunts in the sharky waters around the Gatsby islands.",
    date: "Every Thursday at 20:00 CEST",
    href: "https://youtu.be/mHVVFsaDg_8",
  },
  {
    title: "Gatsby v4 Bootcamp",
    what: "Get pratical experience with SSR vs. SSG vs. DSR",
    date: "To be scheduled",
    path: "/gatsby-bootcamps/v4",
  },
  {
    title: "Add Flexibility to Your Site with Gatsby Functions",
    what: "Lightning talk at Gatsby Fall Camp '21",
    path: "/gatsby-fall-camp-2021/",
    // mark: "Replay available",
  },

  {
    title: "A practical introduction to Gatsby Serverless Functions",
    what: "Free webinar recording",
    details: "learn the basic of serverless.",
    href: "https://www.crowdcast.io/e/a-practical-introduction",
    // mark: "Replay available",
  },
  {
    title: "Architecting your Gatsby Serverless Functions with Swizec Teller",
    what: "Free webinar recording",
    details: "learn how to split your function into smaller functions.",
    href: "https://www.crowdcast.io/e/architecturing-your",
    // mark: "Replay available",
  },
  {
    title: "How to test your Gatsby Functions",
    what: "Free webinar",
    details: "more info coming soon",
    date: "November 2nd",
  },
];

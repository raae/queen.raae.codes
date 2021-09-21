import React from "react";
import { Link } from "gatsby";

const EventsSection = ({ upcoming = UPCOMING }) => {
  return (
    <section>
      <h2>Events</h2>
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
    title: "Add Flexibility to Your Site with Gatsby Functions",
    what: "Lightning talk at Gatsby Camp",
    date: "September 17th",
    path: "/gatsby-fall-camp-2021/",
    mark: "Replay available",
  },
  {
    title: "Season Premiere of Gatsby Deep Dives",
    what: "YouTube live show",
    details:
      "our weekly rum-fueled treasure hunts in the sharky waters around the Gatsby islands.",
    date: "September 23rd",
    href: "https://youtu.be/mHVVFsaDg_8",
  },
  {
    title: "Gatsby v4 Bootcamp",
    what: "Get pratical experience with SSR vs. SSG vs. DSR",
    date: "TBA",
    path: "/gatsby-v4-bootcamp/",
  },
  {
    title: "A practical introduction to Gatsby Serverless Functions",
    what: "Free webinar",
    details: "learn the basic of serverless.",
    date: "September 28th",
    href: "https://www.crowdcast.io/e/a-practical-introduction",
  },
  {
    title: "Introduction to Gatsby",
    what: "Internal talk",
    details: "for a web agency (WordPress/Drupal)",
    date: "September 29th",
  },
  {
    title: "How to test your Gatsby Functions",
    what: "Free webinar",
    details: "more info coming soon",
    date: "October 12th",
  },
  {
    title: "From idea to deployed Gatsby Function",
    what: "Workshop",
    details: "a webinar + q&a session + forum + code sample combo.",
    date: "November 9th - 16th",
    href: "https://www.crowdcast.io/e/from-idea-to-deployed",
  },
];

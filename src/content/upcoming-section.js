import React from "react";
import { Link } from "gatsby";

const UpcomingSection = ({ upcoming = UPCOMING }) => {
  return (
    <section>
      <h2>Upcoming</h2>
      <ul>
        {upcoming.map(({ path, href, title, what, details, date }, index) => (
          <li key={index}>
            {path && <Link to={path}>{title}</Link>}
            {href && <a href={href}>{title}</a>}
            {!href && !path && <strong>{title}</strong>}
            <br />
            {what} {details && <em>— {details}</em>}
            <br />
            <small>{date}</small>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UpcomingSection;

const UPCOMING = [
  {
    title: "Add Flexibility to Your Site with Gatsby Functions",
    what: "Lightning talk at Gatsby Camp",
    date: "September 17th",
    path: "/gatsby-fall-camp-2021/",
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
    title: "Introduction to Gatsby",
    what: "Internal talk",
    details: "for wordpress / drupal developers",
    date: "September 29th",
  },
  {
    title: "A practical introduction to Gatsby Serverless Functions",
    what: "Free webinar",
    details: "learn the basic of serverless.",
    date: "September 28th",
    href: "https://www.crowdcast.io/e/a-practical-introduction",
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

import React from "react";
import { Link } from "gatsby";

const UpcomingSection = ({ upcoming = UPCOMING }) => {
  return (
    <section>
      <h2>Upcoming</h2>
      <ul>
        {upcoming.map(({ path, title, what, details, date }) => (
          <li>
            {path ? <Link to={path}>{title}</Link> : <strong>{title}</strong>}
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
    path: "https://www.gatsbyjs.com/blog/gatsbycamp-the-fall-edition/",
  },
  {
    title: "Season Premiere of Gatsby Deep Dives",
    what: "YouTube live show",
    details:
      "our weekly rum-fueled treasure hunts in the sharky waters around the Gatsby islands.",
    date: "September 23rd",
    path: "https://youtu.be/mHVVFsaDg_8",
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
    path: "https://www.crowdcast.io/e/a-practical-introduction",
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
    path: "https://www.crowdcast.io/e/from-idea-to-deployed",
  },
];

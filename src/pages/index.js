import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletter";

const menu = [
  { label: "YouTube", path: "https://youtube.com/raaecodes" },
  { label: "Twitter (@raae)", path: "https://twitter.com/raae" },
];

const upcoming = [
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
    what: "Open Workshop",
    details: "a webinar + q&a session + forum + code sample combo.",
    date: "November 9th - 16th",
    path: "https://www.crowdcast.io/e/from-idea-to-deployed",
  },
];

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <header>
          <h1>
            <span>Greetings!&nbsp;</span>
            <mark>
              I'm Queen Raae{" "}
              <span role="img" aria-label="Crown">
                &nbsp;👑
              </span>
            </mark>{" "}
            <span>I teach web devs how to get the most out of Gatsby.</span>
          </h1>

          <nav>
            <ul>
              {menu.map(({ path, label }) => (
                <li>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <section>
          <NewsletterForm>
            <p>
              Get notified about up-coming workshops, streams and future
              articles to <strong>help you get the most out of Gatsby</strong>{" "}
              by signing up for emails from yours&nbsp;truly.
            </p>
          </NewsletterForm>
        </section>

        <section>
          <h2>Upcoming</h2>
          <ul>
            {upcoming.map(({ path, title, what, details, date }) => (
              <li>
                {path ? (
                  <Link to={path}>{title}</Link>
                ) : (
                  <strong>{title}</strong>
                )}
                <br />
                {what} {details && <em>— {details}</em>}
                <br />
                <small>{date}</small>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>About</h2>
          <p>
            I am a seasoned web developer who loves duct-taping together side
            projects in addition to making apps trusted by the Swedish Armed
            Forces, The Norwegian Water Resources and Energy Directorate, and
            others.
          </p>
          <p>
            Gatsby came into my life in 2018. Since then, I have created
            gatsby-remark-oembed (open-source Gatsby plugin) and spoken at both
            Gatsby Days 2019 and Gatsby Fall Camp 2021.
          </p>
          <p>
            On International Women's day 2020 I launced POW! — the privacy-first
            menstrual cycle journal. A web app created with, you guessed it,
            Gatsby!
          </p>
          <p>
            I have learned a lot about how to get the most out of Gatsby, and I
            am exited to share that with you{" "}
            <span role="img" aria-label="Star eyes">
              🤩
            </span>
          </p>
        </section>

        <section>
          <NewsletterForm>
            <p>
              Get notified about up-coming workshops, streams and future
              articles to <strong>help you get the most out of Gatsby</strong>{" "}
              by signing up for emails from yours&nbsp;truly.
            </p>
          </NewsletterForm>
        </section>
      </main>
    </Layout>
  );
};

export default IndexPage;

import React from "react";
import { StaticImage } from "gatsby-plugin-image";

const AboutSection = () => {
  return (
    <>
      <section>
        <h2>About</h2>
        <p>
          I am a seasoned web developer who loves duct-taping together side
          projects in addition to making apps trusted by the Swedish Armed
          Forces, The Norwegian Water Resources and Energy Directorate, and
          others.
        </p>
        <StaticImage
          src="../../static/raae.png"
          alt="Queen Raae in front of her gallery wall with a laptop in her arms"
        />
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
          I have learned a lot about how to get the most out of Gatsby, and I am
          exited to share that with you{" "}
          <span role="img" aria-label="Star eyes">
            🤩
          </span>
        </p>
      </section>
    </>
  );
};

export default AboutSection;

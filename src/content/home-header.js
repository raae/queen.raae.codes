import React from "react";
import SocialLinks from "./social-links";

const HomeHeader = () => {
  return (
    <header>
      <small>
        <mark>Welcome!</mark> I'm Queen Raae&nbsp;👑
      </small>

      <h1>Let's get the most out of Gatsby, together!</h1>

      <p>
        Watch a webinar, join a bootcamp, ask questions in the chat of our
        weekly show, send me an email or check out some Gatsby GitHub repos.
      </p>

      <nav>
        <SocialLinks />
      </nav>
    </header>
  );
};

export default HomeHeader;

import React from "react";
import SocialLinks from "./social-links";

const HomeHeader = () => {
  return (
    <header>
      <h1>
        <span>Welcome!&nbsp;</span>
        <mark>
          I'm Queen Raae{" "}
          <span role="img" aria-label="Crown">
            &nbsp;👑
          </span>
        </mark>{" "}
        <span>I teach web devs how to get the most out of Gatsby.</span>
      </h1>

      <nav>
        <SocialLinks />
      </nav>
    </header>
  );
};

export default HomeHeader;

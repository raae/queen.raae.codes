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
        <span>
          I help web devs get the most out&nbsp;of&nbsp;Gatsby{" "}
          <span role="img" aria-label="Party poppers">
            🎉🎉🎉
          </span>
        </span>
      </h1>

      <nav>
        <SocialLinks />
      </nav>
    </header>
  );
};

export default HomeHeader;

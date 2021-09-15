import React from "react";
import { Link } from "gatsby";

const SocialLinks = ({ menu = MENU }) => {
  return (
    <ul>
      {menu.map(({ path, label }) => (
        <li>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;

const MENU = [
  { label: "YouTube", path: "https://youtube.com/raaecodes" },
  { label: "Twitter (@raae)", path: "https://twitter.com/raae" },
];

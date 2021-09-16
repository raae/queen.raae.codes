import React from "react";

const SocialLinks = ({ menu = MENU }) => {
  return (
    <ul>
      {menu.map(({ href, label }) => (
        <li key={label}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;

const MENU = [
  { label: "YouTube", href: "https://youtube.com/raaecodes" },
  { label: "Twitter (@raae)", href: "https://twitter.com/raae" },
];

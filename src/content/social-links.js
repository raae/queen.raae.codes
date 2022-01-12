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
  { label: "Email (queen@raae.codes)", href: "mailto:queen@raae.codes" },
  { label: "YouTube", href: "https://youtube.com/QueenRaae" },
  { label: "Twitter", href: "https://twitter.com/raae" },
  { label: "GitHub", href: "https://github.com/queen-raae" },
];

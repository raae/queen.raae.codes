import React from "react";

const Emoji = ({ variant }) => {
  switch (variant) {
    case "presenter":
      return `👩‍🏫`;
    case "calendar":
      return `🗓️`;
    case "tag":
      return `🏷️`;
    case "recording":
      return `📺`;

    default:
      return null;
  }
};

const Icon = ({ variant }) => {
  return (
    <span role="img" alt={variant}>
      <Emoji variant={variant} />
    </span>
  );
};

export default Icon;

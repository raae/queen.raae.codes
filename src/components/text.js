import React from "react";
import { format } from "date-fns";

export const DateText = ({ dateString, skipYear }) => {
  let formatString = "MMMM do, yyyy";
  if (skipYear) {
    formatString = "MMMM do";
  }
  try {
    return (
      <time datetime={dateString}>
        {format(new Date(dateString), formatString)}
      </time>
    );
  } catch (error) {
    return dateString;
  }
};

export const TagsText = ({ tags }) => {
  return <>{tags.join(", ")}</>;
};

export const PossibleExternalLink = ({ children, url }) => {
  if (url) {
    return <a href={url}>{children}</a>;
  } else {
    return children;
  }
};

import React from "react";
import { Link } from "gatsby";

export const InternalOrExternalLink = ({ children, ...props }) => {
  if (props.to) {
    return <Link {...props}>{children}</Link>;
  } else if (props.href) {
    return (
      <a target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  } else {
    console.warn("No href or to property", props);
    return <span {...props}>{children}</span>;
  }
};

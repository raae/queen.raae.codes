import * as React from "react";
import { Link } from "gatsby";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";

export const PageSectionBreadcrumbs = ({
  items = [],
  component = "nav",
  ...props
}) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      my="1rem"
      component={component}
      separator="·"
      {...props}
    >
      {items.map(({ label, to }, index) => {
        return (
          <MuiLink
            key={index}
            component={to ? Link : "span"}
            variant="overline"
            underline={to ? "hover" : "none"}
            color={index + 1 === items.length ? "text.primary" : "inherit"}
            to={to}
          >
            {label}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

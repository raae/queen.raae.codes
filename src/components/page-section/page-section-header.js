import * as React from "react";
import { Link } from "gatsby";
import { Typography } from "@mui/material";

export const PageSectionHeader = ({
  badge,
  title,
  titlePath,
  lead,
  hLevel = 2,
}) => {
  const blocks = [
    { type: "badge", children: badge },
    { type: "title", children: title, path: titlePath },
    { type: "lead", children: lead },
  ].filter((block) => Boolean(block.children));

  return blocks.map((block, index) => {
    const { children, type, path } = block;
    const blockProps = {
      component: hLevel + index <= 2 ? `h${hLevel + index}` : "p",
    };
    const titleVariant = `h${hLevel}`;
    const leadVariant = `subtitle${hLevel}`;

    switch (type) {
      case "badge":
        return (
          <Typography
            key={type}
            variant="overline"
            color="primary"
            {...blockProps}
            my="1rem"
          >
            {children}
          </Typography>
        );
      case "title":
        return (
          <Typography
            key={type}
            variant={titleVariant}
            {...blockProps}
            my="0.75em"
          >
            {titlePath ? (
              <Typography
                component={Link}
                variant={titleVariant}
                to={path}
                color="inherit"
                sx={{ textDecoration: "none" }}
              >
                {children}
              </Typography>
            ) : (
              children
            )}
          </Typography>
        );
      case "lead":
        return (
          <Typography key={type} variant={leadVariant} {...blockProps} my="1em">
            {children}
          </Typography>
        );

      default:
        return null;
    }
  });
};

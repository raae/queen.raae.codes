import * as React from "react";
import { Link } from "gatsby";
import clsx from "clsx";

export const PageSectionHeader = ({
  badge,
  title,
  titlePath,
  lead,
  tagline,
  hLevel = 2,
}) => {
  const blocks = [
    { type: "badge", children: badge },
    { type: "title", children: title, path: titlePath },
    { type: "lead", children: lead },
    { type: "tagline", children: tagline },
  ].filter((block) => Boolean(block.children));

  return blocks.map((block, index) => {
    const { children, type, path } = block;
    const titleVariant = `h${hLevel}`;
    const Component = hLevel + index <= 2 ? `h${hLevel + index}` : "p";

    switch (type) {
      case "badge":
        return (
          <Component
            key={type}
            className="text-xs font-semibold uppercase leading-none text-teal-900 my-7"
          >
            {children}
          </Component>
        );
      case "title":
        return (
          <Component
            key={type}
            className={clsx(
              titleVariant === "h1" &&
                "text-[2.75rem] font-black leading-none my-9",
              titleVariant === "h2" && "text-3xl font-black leading-none my-8"
            )}
          >
            {titlePath ? (
              <Link
                to={path}
                className="text-inherit decoration-transparent transition hover:decoration-amber-600"
              >
                {children}
              </Link>
            ) : (
              children
            )}
          </Component>
        );
      case "lead":
        return (
          <Component key={type} className="text-xl font-bold leading-snug my-4">
            {children}
          </Component>
        );
      case "tagline":
        return (
          <Component key={type} className="my-2">
            {children}
          </Component>
        );

      default:
        return null;
    }
  });
};

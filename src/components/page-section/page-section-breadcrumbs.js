import * as React from "react";
import { Link } from "gatsby";
import clsx from "clsx";

export const PageSectionBreadcrumbs = ({
  items = [],
  component = "nav",
  className,
  ...props
}) => {
  const Component = component;
  return (
    <Component
      aria-label="breadcrumb"
      className={className}
      separator="·"
      {...props}
    >
      {items.map(({ label, to }, index) => {
        const Component = to ? Link : "span";
        const isLast = index + 1 === items.length;
        return (
          <Component
            key={index}
            to={to}
            className={clsx(
              "text-xs font-semibold uppercase leading-none no-underline inline-block group",
              isLast ? "text-inherit" : "text-teal-900"
            )}
          >
            <span className={clsx(to && "group-hover:underline")}>{label}</span>

            {!isLast && (
              <span aria-hidden={true} className="px-2">
                ·
              </span>
            )}
          </Component>
        );
      })}
    </Component>
  );
};

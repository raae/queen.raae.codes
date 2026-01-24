import React from "react";
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon as InternalLinkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { InternalOrExternalLink } from "./link";

export const ContentList = ({
  items = [],
  ctas = [],
  sx,
  children,
  className,
  ...props
}) => {
  return (
    <ul
      className={clsx("list-none px-0 my-0 -ml-1 space-y-4", className)}
      {...props}
    >
      {items.map((item) => {
        const { primary, secondary, body, to, href } = item;
        return (
          <li
            key={to || href}
            className="mx-2 px-5 py-3 pb-4 relative border-0 border-l-4 border-solid border-amber-500 flex flex-col transition hover:bg-amber-400/30 focus-within:border-l-transparent focus-within:ring-4 focus-within:ring-offset-4 focus-within:ring-amber-500"
          >
            <h3 className="text-base my-0 font-bold">
              <InternalOrExternalLink
                to={to}
                href={href}
                target={href && "_blank"}
                rel={href && "noreferrer"}
                className="text-inherit no-underline focus:outline-none"
              >
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {primary}
                {href && (
                  <ExternalLinkIcon className="h-4 ml-1.5 fill-amber-600 opacity-30 inline-block translate-y-1" />
                )}
              </InternalOrExternalLink>
            </h3>
            <p className="text-xs my-0 order-first leading-8 font-medium text-teal-800 uppercase tracking-tight">
              {secondary}
            </p>
            {body}
          </li>
        );
      })}
      {ctas.map((item, index) => {
        const { to, href, label } = item;

        return (
          <li className={clsx("mx-2", index === 0 && "pt-4")}>
            <InternalOrExternalLink
              to={to}
              href={href}
              className="w-full no-underline inline-flex items-center justify-between border-2 border-solid border-teal-800 px-4 py-2 text-sm text-teal-900 font-bold shadow-sm hover:bg-amber-400/40 focus:outline-none focus:ring-4 focus:ring-teal-500"
            >
              {label}
              {href && <ExternalLinkIcon className="ml-2 -mr-1 h-4" />}
              {to && <InternalLinkIcon className="ml-2 -mr-1 h-4" />}
            </InternalOrExternalLink>
          </li>
        );
      })}
    </ul>
  );
};

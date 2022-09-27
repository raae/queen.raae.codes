import React from "react";
import { Link } from "gatsby";
import { ArrowTopRightOnSquareIcon as ExternalIcon } from "@heroicons/react/20/solid";

export const ContentList = ({ items = [], sx, children, ...props }) => {
  return (
    <ul className="list-none px-0 -mx-4" {...props}>
      {items.map(({ primary, secondary, body, to, href }) => {
        const LinkOrA = to ? Link : "a";
        return (
          <li
            key={to || href}
            className="mx-2 my-1 p-4 pb-5 relative flex flex-col transition hover:bg-amber-100 focus-within:ring-2 focus-within:ring-amber-600"
          >
            <h3 className="text-base my-0 font-bold text-stone-800">
              <LinkOrA
                to={to}
                href={href}
                target={href && "_blank"}
                rel="noreferrer"
                className="text-inherit no-underline focus:outline-none"
              >
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {primary}
                {href && (
                  <ExternalIcon className="h-4 ml-1.5 fill-amber-600 opacity-30 inline-block translate-y-1" />
                )}
              </LinkOrA>
            </h3>
            <p className="text-xs my-0 order-first leading-8 font-medium text-teal-800 uppercase tracking-tight">
              {secondary}
            </p>
            {body}
          </li>
        );
      })}
      {children}
    </ul>
  );
};

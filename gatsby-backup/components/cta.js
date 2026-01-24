import React from "react";
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon as InternalLinkIcon } from "@heroicons/react/20/solid";
import { InternalOrExternalLink } from "./link";
import clsx from "clsx";

export const CtaButton = ({ href, to, children, className }) => {
  return (
    <InternalOrExternalLink
      to={to}
      href={href}
      className={clsx(
        "no-underline inline-flex items-center justify-between border-2 border-solid border-teal-800 px-4 py-2 text-sm text-teal-900 font-bold shadow-sm hover:bg-amber-400/40 focus:outline-none focus:ring-4 focus:ring-teal-500",
        className
      )}
    >
      {children}
      {href && <ExternalLinkIcon className="ml-2 -mr-1 h-4" />}
      {to && <InternalLinkIcon className="ml-2 -mr-1 h-4" />}
    </InternalOrExternalLink>
  );
};

export const CtaSection = ({ href, to, label, note, noteTitle, className }) => {
  if (!label) return null;
  if (!href && !to) return null;

  return (
    <div className={className}>
      <CtaButton
        href={href}
        to={to}
        className="no-underline inline-flex items-center justify-between border-2 border-solid border-teal-800 px-4 py-2 text-sm text-teal-900 font-bold shadow-sm hover:bg-amber-400/40 focus:outline-none focus:ring-4 focus:ring-teal-500"
      >
        {label}
      </CtaButton>

      {noteTitle && (
        <p className="text-xs pl-0.5 font-semibold my-2">{noteTitle}</p>
      )}
      {note && <p className="text-xs pl-0.5 my-2">{note}</p>}
    </div>
  );
};

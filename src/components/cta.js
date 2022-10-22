import React from "react";
import { ArrowTopRightOnSquareIcon as ExternalLinkIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon as InternalLinkIcon } from "@heroicons/react/20/solid";
import { InternalOrExternalLink } from "./link";

export const Cta = ({ href, to, label, note, noteTitle, className }) => {
  if (!label) return null;
  if (!href && !to) return null;

  return (
    <div className={className}>
      <InternalOrExternalLink
        href={href}
        to={to}
        className="no-underline inline-flex items-center justify-between border-2 border-solid border-teal-800 px-4 py-2 text-sm text-teal-900 font-bold shadow-sm hover:bg-amber-400/40 focus:outline-none focus:ring-4 focus:ring-teal-500"
      >
        {label}
        {href && <ExternalLinkIcon className="ml-2 -mr-1 h-4" />}
        {to && <InternalLinkIcon className="ml-2 -mr-1 h-4" />}
      </InternalOrExternalLink>

      {noteTitle && (
        <p className="text-xs pl-0.5 font-semibold my-2">{noteTitle}</p>
      )}
      {note && <p className="text-xs pl-0.5 my-2">{note}</p>}
    </div>
  );
};

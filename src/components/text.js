import React from "react";
import {
  format as formatFn,
  formatISO as formatISOFn,
  addDays as addDaysFn,
} from "date-fns";
import { ArrowTopRightOnSquareIcon as ExternalIcon } from "@heroicons/react/20/solid";

export const DateText = ({ dateString, addDays, skipYear }) => {
  let formatString = "MMMM do, yyyy";
  if (skipYear) {
    formatString = "EEEE, MMMM do";
  }

  try {
    let date = new Date(dateString);
    if (addDays) {
      date = addDaysFn(date, addDays);
    }
    return (
      <time
        dateTime={formatISOFn(date, {
          representation: "date",
        })}
      >
        {formatFn(date, formatString)}
      </time>
    );
  } catch (error) {
    return dateString;
  }
};

export const TagsText = ({ tags }) => {
  return <>{tags.join(", ")}</>;
};

export const PossibleExternalLink = ({ children, url, ...props }) => {
  if (url) {
    return (
      <a
        component="a"
        href={url}
        target="_blank"
        rel={"noreferrer"}
        className="text-inherit group underline underline-offset-2 hover:decoration-amber-600 transition"
        {...props}
      >
        {children}

        <ExternalIcon className="h-4 ml-1.5 fill-amber-600 opacity-30 inline-block translate-y-1 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  } else {
    return <span {...props}>{children}</span>;
  }
};

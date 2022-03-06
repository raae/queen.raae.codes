import React from "react";
import {
  format as formatFn,
  formatISO as formatISOFn,
  addDays as addDaysFn,
} from "date-fns";
import { Link as MuiLink, Typography } from "@mui/material";

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
      <MuiLink component="a" href={url} {...props}>
        {children}
      </MuiLink>
    );
  } else {
    return <Typography {...props}>{children}</Typography>;
  }
};

// export const PossibleExternalLink = ({ children, url, ...props }) => {
//   if (url) {
//     return (
//       <MuiLink component="a" href={url} {...props}>
//         {children}
//       </MuiLink>
//     );
//   } else {
//     return <Typography {...props}>{children}</Typography>;
//   }
// };

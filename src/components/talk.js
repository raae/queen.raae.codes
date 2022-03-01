import React from "react";
import { IconList, IconListItem } from "./icon-list";
import { DateText, PossibleExternalLink } from "./text";

const getRecordingText = (url) => {
  if (url.includes("youtu")) {
    return "Watch the recording on YouTube";
  } else {
    return "Watch the recording";
  }
};

const Talk = ({ date, url, recording, event }) => {
  return (
    <aside>
      <IconList>
        {event && (
          <IconListItem icon="location">
            <PossibleExternalLink url={url}>{event}</PossibleExternalLink>
          </IconListItem>
        )}

        {date && (
          <IconListItem icon="calendar">
            <DateText dateString={date} />
          </IconListItem>
        )}

        {recording && (
          <IconListItem icon="recording">
            <a href={recording}>{getRecordingText(recording)}</a>
          </IconListItem>
        )}
      </IconList>
    </aside>
  );
};

export default Talk;

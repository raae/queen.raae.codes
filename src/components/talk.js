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

const Talk = ({ date, recording, event, eventUrl }) => {
  return (
    <aside>
      <IconList>
        {date && (
          <IconListItem icon="calendar">
            <DateText dateString={date} />
          </IconListItem>
        )}

        {event && (
          <IconListItem icon="location">
            <PossibleExternalLink url={eventUrl}>{event}</PossibleExternalLink>
          </IconListItem>
        )}

        {recording && (
          <IconListItem icon="recording">
            <PossibleExternalLink url={recording}>
              {getRecordingText(recording)}
            </PossibleExternalLink>
          </IconListItem>
        )}
      </IconList>
    </aside>
  );
};

export default Talk;

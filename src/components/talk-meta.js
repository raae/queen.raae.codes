import React from "react";
import { format } from "date-fns";
import Icon from "./icon";

const EventText = ({ children, url }) => {
  if (url) {
    return <a href={url}>{children}</a>;
  } else {
    return children;
  }
};

const DateText = ({ children }) => {
  try {
    return format(new Date(children), "MMMM do yyyy");
  } catch (error) {
    return children;
  }
};

const RecordingText = ({ children }) => {
  if (children.includes("youtu")) {
    return (
      <>
        <a href={children}>Watch the recording on YouTube</a>
      </>
    );
  } else {
    return <a href={children}>Watch the recording</a>;
  }
};

const TalkMeta = ({ date, tags, url, recording, event, type }) => {
  return (
    <aside>
      <dl>
        <dt>
          <Icon variant="presenter" />
        </dt>
        <dd>
          {type || "Talk"} held at <EventText url={url}>{event}</EventText>
        </dd>
        {tags && (
          <>
            <dt>
              <Icon variant="tag" />
            </dt>
            <dd>{tags.join(", ")}</dd>
          </>
        )}
        {date && (
          <>
            <dt>
              <Icon variant="calendar" />
            </dt>
            <dd>
              <DateText>{date}</DateText>
            </dd>
          </>
        )}

        <dt>
          <Icon variant="recording" />
        </dt>
        <dd>
          <RecordingText>{recording}</RecordingText>
        </dd>
      </dl>
    </aside>
  );
};

export default TalkMeta;

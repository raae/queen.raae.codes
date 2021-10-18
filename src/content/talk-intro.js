import React from "react";
import { IconList, IconListItem } from "../components/icon-list";
import { TagsText, DateText, PossibleExternalLink } from "../components/text";

const getRecordingText = (url) => {
  if (url.includes("youtu")) {
    return "Watch the recording on YouTube";
  } else {
    return "Watch the recording";
  }
};

const TalkMeta = ({ date, tags, url, recording, event }) => {
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

        {tags && (
          <IconListItem icon="tag">
            <TagsText tags={tags} />
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

const TalkIntro = (props) => {
  const { title, type, CoverImage, recording } = props;
  return (
    <>
      <small>
        <mark>{type || "Talk"}</mark> by Queen Raae
      </small>

      <h1>{title}</h1>

      <TalkMeta {...props} />
      {recording ? (
        <a href={recording} title={getRecordingText(recording)}>
          {CoverImage}
        </a>
      ) : (
        CoverImage
      )}
    </>
  );
};

export default TalkIntro;

import React from "react";
import { IconList, IconListItem } from "../components/icon-list";
import { DateText, TagsText } from "../components/text";

const BootcampIntro = ({
  title,
  outcome,
  location,
  tags,
  start,
  end,
  CoverImage,
}) => {
  return (
    <>
      <small>
        <mark>Gatsby Mini Bootcamp</mark> by Queen Raae
      </small>

      <h1>{title}</h1>

      <p>{outcome}</p>

      <IconList>
        {location && <IconListItem icon="location">{location}</IconListItem>}
        {tags && (
          <IconListItem icon="tag">
            <TagsText tags={tags} />
          </IconListItem>
        )}
        {start && end && (
          <IconListItem icon="calendar">
            <DateText dateString={start} skipYear /> -{" "}
            <DateText dateString={end} skipYear />
          </IconListItem>
        )}
      </IconList>

      {CoverImage}
    </>
  );
};

export default BootcampIntro;

import React from "react";
import { IconList, IconListItem } from "../components/icon-list";
import { DateText } from "../components/text";

const BootcampIntro = ({ title, outcome, start, end, price, deadline }) => {
  return (
    <>
      <small>
        <mark>Gatsby Mini Bootcamp</mark> with Queen Raae&nbsp;👑
      </small>

      <h1>{title}</h1>

      <p>{outcome}</p>

      {/* <IconList>
        {start && end && (
          <IconListItem icon="calendar">
            <DateText dateString={start} skipYear /> -{" "}
            <DateText dateString={end} skipYear />
          </IconListItem>
        )}
        {price && <IconListItem icon="price">{price}</IconListItem>}
      </IconList> */}
      <h4>
        <a href="#join">Join now!</a>
      </h4>
    </>
  );
};

export default BootcampIntro;

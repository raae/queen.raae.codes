import React from "react";
import Icon from "./icon";

export const IconListItem = ({ icon, children }) => {
  return (
    <>
      <dt>
        <Icon variant={icon} />
      </dt>
      <dd>{children}</dd>
    </>
  );
};

export const IconList = ({ children }) => {
  return <dl>{children}</dl>;
};

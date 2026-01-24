import React from "react";

import Icon from "./icon";

export const IconListItem = ({ icon, children }) => {
  return (
    <>
      <dt className="inline mr-2">
        <Icon variant={icon} />
      </dt>
      <dd className="inline mx-0 after:content-[''] after:block">{children}</dd>
    </>
  );
};

export const IconList = ({ children }) => {
  return <dl>{children}</dl>;
};

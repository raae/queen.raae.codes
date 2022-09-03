import React from "react";

export const onRenderBody = (gatsbyUtils) => {
  const { setHeadComponents, setHtmlAttributes } = gatsbyUtils;

  setHtmlAttributes({ lang: "en" });

  setHeadComponents([
    <style key="base-font-size">
      {`html {
          font-size: clamp(16px, 18px + .15vw, 19px)
      }`}
    </style>,
  ]);
};

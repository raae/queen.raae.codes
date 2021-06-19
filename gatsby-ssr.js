import React, { Fragment } from "react"
import { Global, css } from "@emotion/react"

import PageElement from "./src/components/page-element"

export const wrapPageElement = ({ element }) => {
  return <PageElement>{element}</PageElement>
}

export const wrapRootElement = ({ element }) => {
  return (
    <Fragment>
      <Global
        styles={css`
          @font-face {
            font-family: "FuturaPTBook";
            src: url("/fonts/FuturaPTBook.woff") format("woff"),
              url("/fonts/FuturaPTBook.woff2") format("woff2");
            font-weight: 400;
            font-style: normal;
          }
          @font-face {
            font-family: "FuturaPTBold";
            src: url("/fonts/FuturaPTBold.woff") format("woff"),
              url("/fonts/FuturaPTBold.woff2") format("woff2");
            font-weight: 700;
            font-style: normal;
          }
        `}
      />
      {element}
    </Fragment>
  )
}

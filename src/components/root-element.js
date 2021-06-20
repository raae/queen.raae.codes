import React, { Fragment } from "react"
import { Global, css } from "@emotion/react"

const RootElement = ({ children }) => {
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
            font-style: bold;
          }
          @font-face {
            font-family: "ShrikhandRegular";
            src: url("/fonts/ShrikhandRegular.woff") format("woff"),
              url("/fonts/ShrikhandRegular.woff2") format("woff2");
            font-weight: 400;
            font-style: normal;
          }
        `}
      />
      {children}
    </Fragment>
  )
}

export default RootElement
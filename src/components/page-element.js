import React, { Fragment } from "react"
import { Box } from "theme-ui"

import Seo from "../components/seo"

const PageElement = ({ children }) => {
  return (
    <Fragment>
      <Seo />
      <Box as="main">{children}</Box>
    </Fragment>
  )
}

export default PageElement

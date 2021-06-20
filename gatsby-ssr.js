import React from "react"

import PageElement from "./src/components/page-element"
import RootElement from "./src/components/root-element"

export const wrapPageElement = ({ element }) => {
  return <PageElement>{element}</PageElement>
}

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}

import React, { Fragment } from "react"
import { Text } from "theme-ui"

const DescriptionList = ({ icon, title, description }) => {
  return (
    <Fragment>
      <Text as="dt" variant="text.dt">
        {icon}
        {title}
      </Text>
      <Text as="dd" variant="text.dd">
        {description}
      </Text>
    </Fragment>
  )
}

export default DescriptionList

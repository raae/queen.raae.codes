import { Box } from "@theme-ui/components"
import React from "react"

const Webinar = ({ crowdcast, cover, title, date }) => {
  return (
    <Box my="4">
      <p>
        <a href={crowdcast} target="_blank" rel="noreferrer">
          <img src={`/images/${cover}`} alt={title} />
        </a>
      </p>
      <p className="dense">
        <small>
          <em>Sign up</em> for the free webinar <a href={crowdcast}>{title}</a>
        </small>
      </p>
      <p className="dense">
        <small>{date}</small>
      </p>
    </Box>
  )
}

export default Webinar

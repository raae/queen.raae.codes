import React from "react"
import { Flex, Box, Avatar } from "theme-ui"

const Crew = ({ members }) => {
  return members.map(({ avatar, intro, description, skill }, key) => (
    <Box key={key} my="5">
      {key === 1 ? <h2>The Nattermob Pirates</h2> : null}
      <Flex>
        <Box>
          <Avatar src={avatar} />
        </Box>
        <Box>
          {key === 0 ? <h2>The Queen</h2> : null}
          <p className="intro">{intro}</p>
          <p>{description}</p>
          <p>
            <em>Special skill:</em> {skill}
          </p>
        </Box>
      </Flex>
    </Box>
  ))
}

export default Crew

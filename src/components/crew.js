import React from "react"
import { Grid, Box, Avatar } from "theme-ui"

const Crew = ({ members }) => {
  return members.map(({ avatar, intro, description, skill }, key) => (
    <Box key={key} my="5">
      {key === 1 ? <h2>The Nattermob Pirates</h2> : null}
      <Grid
        sx={{
          gridTemplateColumns: ["1fr", "auto 1fr"],
          gap: [0, 2],
        }}
      >
        <Box>
          <Avatar
            sx={{
              mt: 2,
            }}
            src={`/images${avatar}`}
          />
        </Box>
        <Box
          sx={{
            h2: {
              mt: 0,
            },
          }}
        >
          {key === 0 ? <h2>The Queen</h2> : null}
          <p className="intro">{intro}</p>
          <p>{description}</p>
          <p>
            <em>Special skill:</em> {skill}
          </p>
        </Box>
      </Grid>
    </Box>
  ))
}

export default Crew

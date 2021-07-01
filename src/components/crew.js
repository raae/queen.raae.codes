import React from "react"
import { Grid, Box, Avatar } from "theme-ui"

const Crew = ({ avatar, intro, description, skill }) => {
  return (
    <Grid
      sx={{
        gridTemplateColumns: ["1fr", "auto 1fr"],
        gap: [2, 4],
      }}
    >
      <Avatar
        sx={{
          width: 120,
          height: 120,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "text",
        }}
        src={`/images/${avatar}`}
      />

      <Box
        sx={{
          h2: {
            mt: 0,
          },
        }}
      >
        <p className="intro">{intro}</p>
        <p>{description}</p>
        <p>
          <em>Special skill:</em> {skill}
        </p>
      </Box>
    </Grid>
  )
}

export default Crew

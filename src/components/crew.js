import React from "react"
import { Grid, Box, Avatar } from "theme-ui"

const Crew = ({ avatar, intro, description, skill, color = "primaryDark" }) => {
  return (
    <Grid
      sx={{
        gridTemplateColumns: ["1fr", "1fr auto"],
        gap: 4,
      }}
    >
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
          <small>
            <em>Special skill:</em> {skill}
          </small>
        </p>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{
            width: 240,
            height: 240,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: color,
          }}
          src={`/images/${avatar}`}
        />
      </Box>
    </Grid>
  )
}

export default Crew

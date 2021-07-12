import React from "react"
import { Grid, Box, Avatar, Text } from "theme-ui"

const Crew = ({
  avatar,
  intro,
  description,
  skill,
  crowdcast,
  date,
  photo,
  color = "primaryDark",
}) => {
  return (
    <Grid
      sx={{
        gridTemplateColumns: ["1fr", "1fr auto"],
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",

          h3: {
            fontSize: 3,
            marginTop: 0,
            marginBottom: 0,
          },
        }}
      >
        <h3>{intro}</h3>

        <p>{description}</p>
        {skill && (
          <p className="dense">
            <small>
              <em>Special skill:</em> {skill}
            </small>
          </p>
        )}
        {date && (
          <p className="dense">
            <small>
              {crowdcast && (
                <>
                  <em>Sign up</em> for{" "}
                  <a href={crowdcast} target="_blank" rel="noreferrer">
                    the free webinar
                  </a>
                  <br />
                </>
              )}
              {date}
            </small>
          </p>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
        {photo && <Text sx={{ fontSize: 0, marginTop: 2 }}>{photo}</Text>}
      </Box>
    </Grid>
  )
}

export default Crew

import React from "react"
import { Grid, Box, Button } from "theme-ui"

const PricingTable = ({ plans, perks, outro }) => {
  return (
    <>
      <Grid columns={[1, 3]} gap="4" ml={[0, 5]}>
        {plans.map(({ title, price, stripeLinkId }, key) => (
          <Box
            sx={{
              h3: {
                mb: 3,
              },
              ul: {
                listStyle: "none",
                margin: 0,
                padding: 0,
              },
              li: { my: 1, mx: 2 },
            }}
          >
            <h3>{title}</h3>
            <ul>
              {perks.map(({ item, plans }) => (
                <li>
                  {key >= plans ? (
                    <span role="img" aria-label="Includes">
                      ✅
                    </span>
                  ) : (
                    <span role="img" aria-label="Does not includes">
                      ❌
                    </span>
                  )}
                  &nbsp;&nbsp;{item}
                </li>
              ))}
            </ul>
            <Button
              sx={{ width: "100%" }}
              mt="3"
              as="a"
              href={`https://buy.stripe.com/${stripeLinkId}`}
            >
              ${price}
            </Button>
          </Box>
        ))}
      </Grid>

      <Box
        mt={4}
        sx={{ textAlign: "center", maxWidth: "container", mx: "auto" }}
      >
        {outro}
      </Box>
    </>
  )
}

export default PricingTable

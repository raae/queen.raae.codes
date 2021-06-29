import React from "react"
import { Grid, Box, Button, Paragraph } from "theme-ui"
import axios from "axios"
import { useQuery } from "react-query"

const intervalMs = 5000

const PricingTable = ({ plans, perks, outro, productId }) => {
  const { data, error } = useQuery(
    "prices",
    async () => {
      const res = await axios.get("/api/seats", {
        params: { productId },
      })
      return res.data
    },
    {
      // Refetch the data every second
      refetchInterval: intervalMs,
    }
  )

  return (
    <>
      <Grid columns={[1, 3]} gap="4" ml={[0, 5]}>
        {plans.map(({ title, price, stripeLinkId, stripePriceId }, key) => {
          const metadata = data?.[stripePriceId]
          const disabled = (!metadata || metadata.available < 1) && !error
          return (
            <Box
              key={stripePriceId}
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
                p: {
                  fontSize: 2,
                  textAlign: "center",
                },
              }}
            >
              <h3>{title}</h3>
              <ul>
                {perks.map(({ item, plans }) => (
                  <li key={item}>
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
                href={
                  disabled ? null : `https://buy.stripe.com/${stripeLinkId}`
                }
                disabled={disabled}
                className={disabled ? "disabled" : ""}
              >
                ${price}
              </Button>
              <p>
                {metadata ? (
                  <span>
                    {metadata.available} out of {metadata.total} seats left
                  </span>
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
            </Box>
          )
        })}
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

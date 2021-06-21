import React, { useState } from "react"
import axios from "axios"
import { Box, Grid, Close, Message, Button, Input } from "theme-ui"

const makeAlertMessage = (status) => {
  switch (status) {
    case "error":
      return "Ooops, something went wrong..."
    case "success":
      return "Check your inbox and make sure to hit that confirm button..."
    case "pending":
      return "Awaiting the matrix..."

    default:
      return ""
  }
}

const NewsletterForm = ({ cta, children, ...props }) => {
  const [status, setStatus] = useState("idle")

  const handleSubmit = async (event) => {
    setStatus("pending")
    event.preventDefault()

    try {
      await axios.post("/api/newsletter", {
        email: event.target.elements.email.value,
      })
      setStatus("success")
    } catch (error) {
      setStatus("error")
    }
  }

  const handleClose = () => {
    setStatus("idle")
  }

  const isDisabled = ["pending"].includes(status)

  return (
    <Box sx={{ position: "relative" }} {...props}>
      {children}
      {status === "idle" ? (
        <Grid
          as="form"
          onSubmit={handleSubmit}
          mt={children ? 3 : 0}
          sx={{
            gridTemplateColumns: ["1fr", "1fr", "1fr auto"],
            gap: 2,
          }}
        >
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Your best email..."
            marginRight="2"
            required
          />

          <Button disabled={isDisabled}>{cta || "Sign up"}</Button>
        </Grid>
      ) : (
        <Message variant={status}>
          {makeAlertMessage(status)}
          {status === "error" ? (
            <Close type="reset" onClick={handleClose} />
          ) : null}
        </Message>
      )}
    </Box>
  )
}

export default NewsletterForm

import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { addSubscriber } from "./subscriptions";

const ALERT = {
  PENDING: { severity: "info", message: "Hold on..." },
  FULFILLED: {
    severity: "success",
    title: "Almost there!",
    message: "Check your inbox to confirm...",
  },
  FAILED: {
    severity: "error",
    message: "Oh no...something went wrong...",
  },
};

const NewsletterForm = ({
  formKey,
  children,
  cta,
  tags = [],
  anchor = "",
  sx,
  ...props
}) => {
  const [status, setStatus] = useState("INITIAL");
  const alert = ALERT[status];

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setStatus("PENDING");

    try {
      // TODO: Already subscribed through this form message
      await addSubscriber({
        email: event.target.elements.email.value,
        formKey: formKey,
        tags: tags,
      });
      setStatus("FULFILLED");
    } catch (error) {
      console.warn(error);
      setStatus("FAILED");
    }
  };

  const handleDismiss = async (event) => {
    event.preventDefault();
    setStatus("INITIAL");
  };

  if (!formKey) {
    console.error("NewsletterForm missing formKey");
    return null;
  }

  if (!cta) {
    console.error("NewsletterForm missing cta");
    return null;
  }

  return (
    <Box
      component="form"
      onSubmit={handleOnSubmit}
      id={anchor}
      sx={{ position: "relative", ...sx }}
      {...props}
    >
      {children && (
        <Typography variant="body1" sx={{ maxWidth: "48ch" }}>
          {children}
        </Typography>
      )}

      <Box sx={{ display: "flex", maxWidth: "50ch", mt: 3 }}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Your best email"
          size="small"
          disabled={status === "pending"}
          sx={{ flexGrow: 1, mr: 1 }}
          required
        />
        <Button
          variant="contained"
          type="submit"
          disabled={status === "pending"}
        >
          {cta}
        </Button>
      </Box>

      {alert && (
        <Alert
          severity={alert.severity}
          variant="outlined"
          {...(alert.severity === "error" && {
            onClose: handleDismiss,
          })}
          sx={{
            bgcolor: "background.paper",
            boderWidth: "2px",
            alignItems: "center",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: "modal",
            ".MuiAlert-icon": {
              mr: 3,
            },
            ".MuiAlert-action": {
              alignSelf: "flex-start",
            },
          }}
        >
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.message && <>{alert.message}</>}
        </Alert>
      )}
    </Box>
  );
};

export default NewsletterForm;

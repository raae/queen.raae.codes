import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { addSubscriber } from "../services/subscriptions";

const TEXT = {
  PENDING: <>Hold on...</>,
  FULFILLED: (
    <>
      Almost there! <br />
      Check your inbox to confirm...
    </>
  ),
  FAILED: <>Oh no...something went wrong...</>,
};

const NewsletterForm = ({
  formKey = "queen",
  children,
  cta = "Yes, please!",
  label,
  tags = [],
  anchor = "",
}) => {
  const [status, setStatus] = useState("INITIAL");

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

  return (
    <Box component="form" onSubmit={handleOnSubmit} id={anchor}>
      {children}

      <Box sx={{ display: "flex", maxWidth: "90%", mt: 3 }}>
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
          disableElevation
          variant="contained"
          type="submit"
          disabled={status === "pending"}
        >
          {label || cta}
        </Button>
      </Box>

      {status !== "INITIAL" && (
        <aside>
          {status === "FAILED" && (
            <button type="button" onClick={handleDismiss}>
              X
            </button>
          )}
          <strong>{TEXT[status]}</strong>
        </aside>
      )}
    </Box>
  );
};

export default NewsletterForm;

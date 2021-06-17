import React, { useState } from "react";
import axios from "axios";
import { Flex, Close, Alert, Button, Input } from "theme-ui";

const makeAlertMessage = (status) => {
  switch (status) {
    case "error":
      return "Ojsann, something went wrong...";
    case "success":
      return "Check your inbox and make sure to hit that confirm button...";
    case "pending":
      return "Awaiting the matrix...";

    default:
      return "";
  }
};

const ResponseAlert = ({ status, onClose }) => {
  const message = makeAlertMessage(status);
  const isError = status === "error";

  if (!message) {
    return null;
  }

  return (
    <Alert
      sx={{
        position: "absolute",
        left: -1,
        right: -1,
        top: -1,
        bottom: -3,
      }}
    >
      {message}
      {isError && <Close ml="auto" mr={-2} type="reset" onClick={onClose} />}
    </Alert>
  );
};

export const NewsletterForm = ({ cta }) => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    setStatus("pending");
    event.preventDefault();

    try {
      await axios.post("/api/newsletter", {
        email: event.target.elements.email.value,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus("idle");
  };

  const isDisabled = ["pending"].includes(status);

  return (
    <Flex as="form" onSubmit={handleSubmit} sx={{ position: "relative" }}>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Your best email..."
        marginRight="2"
        required
      />

      <Button
        disabled={isDisabled}
        sx={{
          flexShrink: 0,
          ...(isDisabled && { color: "muted" }),
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        {cta || "Sign up"}
      </Button>
      <ResponseAlert status={status} onClose={handleClose} />
    </Flex>
  );
};

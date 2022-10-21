import React, { useState } from "react";
import { Alert, AlertTitle, Typography } from "@mui/material";
import { addSubscriber } from "./subscriptions";
import clsx from "clsx";

import NewsletterIcon from "../../icons/icons8-postal-50.svg";

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
  className,
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
    <form
      onSubmit={handleOnSubmit}
      id={anchor}
      className={clsx("relative", className)}
      {...props}
    >
      {children && (
        <Typography variant="body1" sx={{ maxWidth: "48ch" }}>
          {children}
        </Typography>
      )}

      <div className="flex relative mt-5 max-w-[50ch]">
        <label
          htmlFor="email"
          className="[&>*]:w-6 [&>*]:self-center absolute flex left-3"
        >
          <NewsletterIcon />
          <span class="sr-only">Email:</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          disabled={status === "pending"}
          className="pl-11 w-full flex-grow border-solid transition border-2 border-teal-900 focus:border-teal-900  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
          placeholder="Your best email"
          required
        />

        <button
          className="ml-3 transition flex-shrink-0 text-sm font-semibold px-3 justify-center border border-transparent bg-teal-900 text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          type="submit"
          disabled={status === "pending"}
        >
          {cta}
        </button>
      </div>

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
    </form>
  );
};

export default NewsletterForm;

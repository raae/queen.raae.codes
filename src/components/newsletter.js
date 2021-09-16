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
  subscription = "queen",
  children,
  cta = "Get notifed",
  tags = [],
}) => {
  const [status, setStatus] = useState("INITIAL");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setStatus("PENDING");

    try {
      // TODO: Already subscribed through this form message
      await addSubscriber({
        email: event.target.elements.email.value,
        subscription: subscription,
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
    <form onSubmit={handleOnSubmit}>
      {children}

      <fieldset disabled={status === "pending"}>
        <label htmlFor="email">Your email address:</label>
        <br />
        <input id="email" name="email" type="email" required />
        <button type="submit">{cta}</button>
      </fieldset>

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
    </form>
  );
};

export default NewsletterForm;

import React, { useState } from "react";
import clsx from "clsx";
import { XCircleIcon as CloseIcon } from "@heroicons/react/20/solid";

import { addSubscriber } from "./subscriptions";
import NewsletterIcon from "../../icons/icons8-postal-50.svg";

const ALERT = {
  PENDING: { variant: "info", message: "Hold on..." },
  FULFILLED: {
    variant: "success",
    title: "Almost there!",
    message: "Check your inbox to confirm...",
  },
  FAILED: {
    variant: "error",
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
    event.target[1].blur();
    setStatus("PENDING");

    try {
      // TODO: Already subscribed through this form message
      await addSubscriber({
        email: event.target.elements.email.value,
        formKey: formKey,
        tags: tags,
      });
      event.target.elements.email.value = "";
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
      {children && <div className="max-w-[48ch]">{children}</div>}

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
          className="pl-11 font-medium w-full flex-grow border-solid transition border-2 border-teal-900 focus:border-teal-900  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
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
        <div
          className={clsx(
            "absolute inset-0 flex flex-col justify-center text-center border-solid border-2 p-4",
            alert.variant === "info" && "bg-sky-50 border-sky-800",
            alert.variant === "success" && "bg-emerald-50 border-emerald-800",
            alert.variant === "error" && "bg-red-50 border-red-800"
          )}
        >
          <CloseIcon
            className={clsx(
              "h-5 absolute top-2 right-2",
              alert.variant === "info" && "opacity-0",
              alert.variant === "success" &&
                "transition text-emerald-900 hover:text-emerald-700",
              alert.variant === "error" &&
                "transition text-red-900 hover:text-red-700"
            )}
            onClick={handleDismiss}
          />
          {alert.title && (
            <h3 className="m-0 mb-0.5 text-sm font-semibold">{alert.title}</h3>
          )}
          {alert.message && <p className="m-0 text-sm">{alert.message}</p>}
        </div>
      )}
    </form>
  );
};

export default NewsletterForm;

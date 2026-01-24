import React from "react";
import NewsletterForm from "./newsletter-form";
import { defaults, isNull, omitBy } from "lodash";

const LILLY_LABS_DEFAULTS = {
  formKey: "lillylabs",
  cta: "Yes, please!",
  tagline: "Join the crew?",
  message:
    "Join the crew and stay up to date by signing up for our Weekly Ship's Log.",
};

const DEFAULTS = {
  cta: "Yes, please!",
};

export const Newsletter = (initialProps) => {
  let props = omitBy(initialProps, isNull);

  if (!props.formKey || props.formKey === "lillylabs") {
    props = defaults(props, LILLY_LABS_DEFAULTS);
  } else {
    props = defaults(props, DEFAULTS);
  }

  const { tagline, message, ...rest } = props;

  return (
    <NewsletterForm {...rest}>
      {tagline && <strong>{tagline} </strong>} {message}
    </NewsletterForm>
  );
};

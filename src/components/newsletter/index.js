import React from "react";
import NewsletterForm from "./newsletter-form";
import { defaults, isNull, omitBy } from "lodash";

const QUEEN_DEFAULTS = {
  formKey: "queen",
  cta: "Yes, please!",
  tagline: "Serious about Gatsby?",
  message:
    "Sign up for emails sent every weekday to help you get the most out of Gatsby!",
};

const DEFAULTS = {
  cta: "Yes, please!",
};

export const Newsletter = (initialProps) => {
  let props = omitBy(initialProps, isNull);

  if (!props.formKey || props.formKey === "queen") {
    props = defaults(props, QUEEN_DEFAULTS);
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

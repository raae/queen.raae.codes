import React from "react";
import NewsletterForm from "../components/newsletter";
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

  console.log({ initialProps, props });

  if (!props.formKey || props.formKey === "queen") {
    props = defaults(QUEEN_DEFAULTS, props);
  } else {
    props = defaults(DEFAULTS, props);
  }

  const { tagline, message, ...rest } = props;

  return (
    <NewsletterForm {...rest}>
      {tagline && <strong>{tagline} </strong>} {message}
    </NewsletterForm>
  );
};

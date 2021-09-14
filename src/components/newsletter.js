import React from "react";

const NewsletterForm = ({ children, cta = "Get notifed" }) => {
  return (
    <form>
      {children}

      <fieldset>
        <label htmlFor="email">Your email address:</label>
        <input id="email" type="email" />
        <button type="submit">{cta}</button>
      </fieldset>
    </form>
  );
};

export default NewsletterForm;

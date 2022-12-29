import * as React from "react";
import clsx from "clsx";

const Prose = ({ html, children, className, ...props }) => {
  return (
    <div
      className={clsx(
        "prose prose-brown",
        "prose-p:leading-normal prose-headings:font-black",
        "prose-a:text-teal-900 prose-a:underline-offset-2 prose-a:font-normal prose-a:transition",
        "prose-ul:px-0 prose-ol:px-0 prose-li:px-0 prose-li:leading-normal",
        className
      )}
    >
      {html && (
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
          {...props}
        />
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

export default Prose;

import React from "react";

const Prose = ({ html, children }) => {
  return (
    <>
      <div className="prose">{children}</div>

      <div
        className="prose"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </>
  );
};

export default Prose;

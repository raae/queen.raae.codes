import React from "react";

const Prose = ({ html, children }) => {
  return (
    <>
      {children && <div className="prose">{children}</div>}

      {html && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
    </>
  );
};

export default Prose;

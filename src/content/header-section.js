import React from "react";

const HeaderSection = ({ label, title, intro, children }) => {
  return (
    <>
      {label && (
        <small>
          <mark>{label}</mark>
        </small>
      )}

      {title && <h1>{title}</h1>}

      {intro && <p>{intro}</p>}

      {children}
    </>
  );
};

export default HeaderSection;

import React from "react";

const BootcampIntro = ({ title, outcome }) => {
  return (
    <>
      <small>
        <mark>Gatsby Mini Bootcamp</mark> with Queen Raae
      </small>

      <h1>{title}</h1>

      <p>{outcome}</p>
    </>
  );
};

export default BootcampIntro;

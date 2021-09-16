import React from "react";
import "./variables.css";
import "./basic.css";
import "./layout.css";
import "./special.css";

import Seo from "../../components/seo";

const RootLayout = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      {children}
    </>
  );
};

export default RootLayout;

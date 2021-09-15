import React from "react";
import "./variables.css";
import "./basic.css";
import "./layout.css";
import "./special.css";

import Seo from "../../components/seo";

const DefaultLayout = ({ children, ...props }) => {
  return (
    <main>
      <Seo {...props} />
      {children}
    </main>
  );
};

export default DefaultLayout;

import React from "react";
import "./variables.css";
import "./basic.css";
import "./layout.css";
import "./special.css";

const Layout = ({ children }) => {
  return <main>{children}</main>;
};

export default Layout;

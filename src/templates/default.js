import React from "react";
import RootLayout from "./root";

const DefaultLayout = ({ children, ...props }) => {
  return <RootLayout {...props}>{children}</RootLayout>;
};

export default DefaultLayout;

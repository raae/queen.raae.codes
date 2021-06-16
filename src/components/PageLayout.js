import React from "react";
import { Container } from "@theme-ui/components";
import { Helmet } from "react-helmet";

export const PageLayout = ({ children }) => {
  return (
    <Container as="main" p={4}>
      <Helmet>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👑</text></svg>"
        ></link>
        <title>Queen @raae's Code School</title>
      </Helmet>

      {children}
    </Container>
  );
};

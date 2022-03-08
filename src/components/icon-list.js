import React from "react";
import { Box } from "@mui/material";

import Icon from "./icon";

export const IconListItem = ({ icon, children }) => {
  return (
    <>
      <dt>
        <Icon variant={icon} />
      </dt>
      <dd>{children}</dd>
    </>
  );
};

export const IconList = ({ children }) => {
  return (
    <Box
      component="dl"
      sx={{
        "& dt": { display: "inline", mr: "0.75em" },
        "& dd": {
          display: "inline",
          mx: 0,
          "&:after": { content: `""`, display: "block" },
        },
      }}
    >
      {children}
    </Box>
  );
};

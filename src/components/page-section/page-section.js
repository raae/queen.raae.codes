import * as React from "react";
import { Box, Container } from "@mui/material";

export const PageSection = ({
  children,
  component = "section",
  maxWidth = "md",
  ...props
}) => {
  return (
    <Box
      {...props}
      component={component}
      sx={{
        bgcolor: "background.paper",
        py: 8,
        "&:nth-child(even)": {
          bgcolor: "background.default",
        },
        "& > * > *": {
          maxWidth: "34rem",
        },
        ...props.sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

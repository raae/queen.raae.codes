import * as React from "react";
import { Box, Container } from "@mui/material";

const SiteSection = ({
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
        "&:first-child": {
          pt: 16,
        },
        "&:nth-child(even)": {
          bgcolor: "background.default",
        },
        ">* >*": {
          maxWidth: "60ch",
        },
        ...props.sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
};

export default SiteSection;

import React from "react";
import { Box, Button, Typography } from "@mui/material";

export const Cta = ({ path, label, note, ...props }) => {
  if (!path || !label) return null;

  return (
    <Box {...props}>
      <Box mb="0.5em">
        <Button variant="contained" component="a" href={path}>
          {label}
        </Button>
      </Box>
      <Typography variant="caption" color="textPrimary" component="p" pl="4px">
        {note}
      </Typography>
    </Box>
  );
};

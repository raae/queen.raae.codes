import React from "react";
import { Link } from "gatsby";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForward as MoreIcon } from "@mui/icons-material";

export const Cta = ({ href, to, label, note, ...props }) => {
  if (!label) return null;
  if (!href && !label) return null;

  return (
    <Box {...props}>
      <Box mb="0.5em">
        <Button
          variant={Boolean(to) ? "outlined" : "contained"}
          component={Boolean(to) ? Link : "a"}
          href={href}
          to={to}
          endIcon={<MoreIcon />}
          fullWidth={Boolean(to)}
        >
          {label}
        </Button>
      </Box>
      <Typography variant="caption" color="textPrimary" component="p" pl="4px">
        {note}
      </Typography>
    </Box>
  );
};

import React from "react";
import { Link } from "gatsby";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForward as MoreIcon } from "@mui/icons-material";

export const Cta = ({
  href,
  to,
  label,
  note,
  endIcon = <MoreIcon />,
  ...props
}) => {
  if (!label) return null;
  if (!href && !to) return null;

  return (
    <Box {...props}>
      <Box>
        <Button
          variant={Boolean(to) ? "outlined" : "contained"}
          component={Boolean(to) ? Link : "a"}
          href={href}
          to={to}
          endIcon={endIcon}
        >
          {label}
        </Button>
      </Box>
      {note && (
        <Typography
          variant="caption"
          color="textPrimary"
          component="p"
          sx={{
            pl: "4px",
            mt: "0.5em",
            a: { color: "inherit", "&:hover": { textDecoration: "none" } },
          }}
        >
          {note}
        </Typography>
      )}
    </Box>
  );
};

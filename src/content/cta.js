import React from "react";
import { Link } from "gatsby";
import { Box, Button, Typography } from "@mui/material";
import { ArrowForward as MoreIcon } from "@mui/icons-material";

export const Cta = ({
  href,
  to,
  label,
  note,
  noteTitle,
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
      {noteTitle && (
        <Typography
          variant="caption"
          color="textPrimary"
          fontWeight={600}
          component="p"
          sx={{
            pl: "4px",
            mt: "1.5em",
            a: { color: "inherit", "&:hover": { textDecoration: "none" } },
          }}
        >
          {noteTitle}
        </Typography>
      )}
      {note && (
        <Typography
          variant="caption"
          color="textPrimary"
          component="p"
          sx={{
            pl: "4px",
            mt: noteTitle ? "0.25em" : "0.5em",
            a: { color: "inherit", "&:hover": { textDecoration: "none" } },
          }}
        >
          {note}
        </Typography>
      )}
    </Box>
  );
};

import React from "react";
import { Link } from "gatsby";
import { Box, Button, Typography } from "@mui/material";
import { ArrowLongRightIcon as MoreIcon } from "@heroicons/react/20/solid";

export const Cta = ({
  href,
  to,
  label,
  note,
  noteTitle,
  endIcon = <MoreIcon className="h-4" />,
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
            mt: noteTitle ? "0em" : "0.5em",
            a: { color: "inherit", "&:hover": { textDecoration: "none" } },
          }}
        >
          {note}
        </Typography>
      )}
    </Box>
  );
};

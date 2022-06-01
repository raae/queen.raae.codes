import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  "> *": {
    ...theme.typography.body1,
    maxWidth: "100%",
    marginBottom: "1rem",
  },
  "& h1": {
    ...theme.typography.h1,
    marginTop: "1.5em",
    marginBottom: "1em",
  },
  "& h2": {
    ...theme.typography.h2,
    marginTop: "1.5em",
    marginBottom: "1em",
  },
  "& h3": {
    ...theme.typography.h3,
    marginTop: "1.5em",
  },
  "& h4": {
    ...theme.typography.h4,
    marginTop: "1.5em",
  },
  "& h5": {
    ...theme.typography.h5,
    marginTop: "1.5em",
  },
  "& h6": {
    ...theme.typography.h6,
    marginTop: "1.5em",
  },
  "& blockquote": {
    border: `4px solid ${theme.palette.secondary.main}`,
    padding: "0.5em 1.5em",
    margin: "1em 0",
    marginBottom: "1.5em",
    cite: {
      display: "block",
      fontSize: theme.typography.body2.fontSize,
      ":before": {
        content: '"— "',
      },
    },
  },
  "& ul": {
    listStyle: "none",
    padding: 0,

    "& li": {
      margin: "0.25rem 0",
      a: {
        display: "inline-block",
        "&:after": { content: `""`, display: "block" },
      },
      "&:before": {
        content: "'➽'",
        display: "inline-block",
        marginRight: "0.5rem",
        color: theme.palette.secondary.dark,
      },
    },
  },
  "& ol": {
    listStyle: "inside",
    padding: 0,

    "& li": {
      margin: "0.25rem 0",
    },
  },
  "& a": {
    color: theme.palette.primary.dark,
    "&:hover": { textDecoration: "none" },
  },
  "& code": {
    fontSize: "0.8em !important",
  },
  "& del": {
    opacity: 0.6,
    fontWeight: theme.typography.fontWeightRegular,
  },
  "& .gatsby-highlight": {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  "& .gatsby-resp-image-wrapper": {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Prose = ({ html, children, ...props }) => {
  return (
    <Box {...props}>
      {html && (
        <Root
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
      {children && <Root>{children}</Root>}
    </Box>
  );
};

export default Prose;

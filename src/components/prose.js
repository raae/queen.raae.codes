import * as React from "react";
import { styled } from "@mui/material/styles";

const Root = styled("div")(({ theme }) => ({
  "> *": {
    ...theme.typography.body1,
    maxWidth: "100%",
  },
  "& h1": {
    ...theme.typography.h1,
  },
  "& h2": {
    ...theme.typography.h2,
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
    <>
      {html && (
        <Root
          {...props}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
      {children && <Root>{children}</Root>}
    </>
  );
};

export default Prose;

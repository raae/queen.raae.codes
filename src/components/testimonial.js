import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Avatar, Box, Link } from "@mui/material";
import Prose from "./prose";

const Testimonial = ({
  who,
  url,
  avatar,
  company,
  attended,
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      component="blockquote"
      {...props}
      sx={{
        border: 4,
        px: "1.5em",
        pt: "0.5em",
        borderColor: "secondary.main",
        m: 0,
        ...sx,
      }}
    >
      <Prose>{children}</Prose>
      <Box sx={{ display: "flex", alignItems: "center", my: "1.5em" }}>
        <Avatar sx={{ width: "5rem", height: "5rem", mr: 3 }}>
          <GatsbyImage image={getImage(avatar)} alt={who} />
        </Avatar>
        <Box component="cite">
          {who && !url && <>{who}</>}
          {who && url && <Link href={url}>{who}</Link>}

          {attended && (
            <>
              <br /> Attended {attended}
            </>
          )}
          {company && (
            <>
              <br />
              <Link href={company.url}>{company.name}</Link>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonial;

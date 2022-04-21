import * as React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Container,
  Button,
} from "@mui/material";

import { Link } from "gatsby";

import LinkButton from "./link-button";

const links = [
  "https://github.com/queen-raae",
  "https://twitter.com/raae",
  "https://youtube.com/QueenRaae",
];

const SiteHeader = () => {
  return (
    <MuiAppBar
      position="sticky"
      sx={{
        borderTop: 5,
        borderTopColor: "brand.500",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button component={Link} title="Queen Raae" to="/" sx={{ ml: -2.5 }}>
            <Box sx={{ transform: "scale(1.5)" }}>👑</Box>
          </Button>

          <Box sx={{ ml: "auto" }}>
            {links.map((url) => (
              <LinkButton key={url} url={url} />
            ))}
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
export default SiteHeader;

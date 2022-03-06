import * as React from "react";
import {
  AppBar as MuiAppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "gatsby";

import LinkButton from "./link-button";

const pages = [
  // { label: "Services", path: "/services" },
  // { label: "Done-for-you Demo", path: "/done-for-you-demo" },
  // { label: "Daily emails", path: "/emails" },
];

const links = [
  "https://github.com/queen-raae",
  "https://twitter.com/raae",
  "https://youtube.com/QueenRaae",
];

const SiteHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <MuiAppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        backgroundColor: "#fffaf0b3",
        backdropFilter: "blur(20px)",
        borderTop: 5,
        borderTopColor: "brand.500",
        borderBottom: "thin",
        borderBottomColor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button component={Link} title="Queen Raae" to="/" sx={{ ml: -2.5 }}>
            <Box sx={{ transform: "scale(1.5)" }}>👑</Box>
          </Button>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ label, path }) => (
              <Button
                component={Link}
                to={path}
                key={path}
                sx={{ textTransform: "none", color: "text.primary", mr: 1 }}
              >
                <Box sx={{ transform: "translateY(2px)" }}>{label}</Box>
              </Button>
            ))}
          </Box> */}
          <Box sx={{ ml: "auto" }}>
            {links.map((url) => (
              <LinkButton key={url} url={url} />
            ))}
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Button
              disableElevation
              variant="contained"
              color="primary"
              aria-label="main menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ ml: 2, minWidth: "auto" }}
              startIcon={<MenuIcon sx={{ mr: -1.5 }} />}
            />

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map(({ path, label }) => (
                <MenuItem
                  component={Link}
                  key={path}
                  to={path}
                  onClick={handleCloseNavMenu}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};
export default SiteHeader;

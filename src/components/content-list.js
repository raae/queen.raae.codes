import React from "react";
import { Link } from "gatsby";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Logout as ExternalIcon } from "@mui/icons-material";

export const ContentList = ({ items = [], sx, children, ...props }) => {
  return (
    <List {...props} sx={{ ...sx }}>
      {items.map(({ primary, secondary, to, href }) => (
        <ListItem key={to || href}>
          <ListItemButton
            component={to ? Link : "a"}
            to={to}
            href={href}
            sx={{
              mx: -1,
              svg: {
                opacity: 0.4,
              },
              "&:hover": {
                svg: {
                  opacity: 1,
                },
              },
            }}
          >
            <ListItemText primary={primary} secondary={secondary} />
            {href && (
              <ExternalIcon
                fontSize="small"
                color="disabled"
                sx={{
                  ml: "auto",
                  mr: 1,
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ))}
      {children}
    </List>
  );
};

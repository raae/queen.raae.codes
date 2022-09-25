import React from "react";
import { Link } from "gatsby";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ArrowTopRightOnSquareIcon as ExternalIcon } from "@heroicons/react/20/solid";

export const ContentList = ({ items = [], sx, children, ...props }) => {
  return (
    <List {...props} sx={{ ...sx }}>
      {items.map(({ primary, secondary, to, href }) => (
        <ListItem key={to || href}>
          <ListItemButton
            component={to ? Link : "a"}
            to={to}
            href={href}
            target={href && "_blank"}
            sx={{
              mx: -1,
              svg: {
                opacity: 0.1,
              },
              "&:hover": {
                svg: {
                  opacity: 0.3,
                },
              },
            }}
          >
            <ListItemText primary={primary} secondary={secondary} />
            {href && <ExternalIcon className="h-5" />}
          </ListItemButton>
        </ListItem>
      ))}
      {children}
    </List>
  );
};

import React from "react";
import { Link } from "gatsby";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const EmailList = ({ emails, ...props }) => {
  return (
    <List {...props} sx={{ ...props.sx, py: 0 }}>
      {emails.map(({ date, slug, title, emojii }) => (
        <ListItem disableGutters key={slug}>
          <ListItemButton component={Link} to={slug} sx={{ mx: -2 }}>
            <ListItemText
              primary={title}
              secondary={
                <>
                  <Typography
                    component="span"
                    color="textPrimary"
                    sx={{ mr: 1 }}
                  >
                    {emojii}
                  </Typography>
                  {date}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default EmailList;

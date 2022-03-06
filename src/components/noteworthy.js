import React from "react";
import { Link } from "gatsby";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const Noteworthy = ({ upcoming = UPCOMING, ...props }) => {
  return (
    <List {...props} sx={{ ...props.sx, py: 0 }}>
      {upcoming.map(({ path, href, title, details }) => (
        <ListItem disableGutters key={path || href}>
          <ListItemButton
            component={path ? Link : "a"}
            to={path}
            href={href}
            sx={{ mx: -2 }}
          >
            <ListItemText primary={title} secondary={<>{details}</>} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Noteworthy;

const UPCOMING = [
  {
    title:
      "Unauthorized and rum-fueled treasure hunts in the sharky waters around the Gatsby islands",
    details: "YouTube Live Stream every Thursday at 19:00 CET",
    href: "https://www.youtube.com/QueenRaae",
  },
  {
    title: "Add Flexibility to Your Site with Gatsby Functions",
    what: "Lightning talk at Gatsby Fall Camp '21",
    details: "Lightning talk at Gatsby Fall Camp '21",
    path: "/gatsby-fall-camp-2021/",
  },
  {
    title: "TDD + Gatsby Serverless Functions",
    details:
      "Mirjam shows us how to get started with Test Driven Development (TDD) in this free webinar",
    href: "https://www.crowdcast.io/e/testing-your-functions/",
  },
  {
    title: "A practical introduction to Gatsby Serverless Functions",
    details: "Learn the basic of Gatsby Functions in this free webinar",
    href: "https://www.crowdcast.io/e/a-practical-introduction/",
  },
  {
    title: "Architecting your Gatsby Serverless Functions with Swizec Teller",
    what: "Free webinar recording",
    details:
      "Learn how to split your function into smaller functions in this free webinar",
    href: "https://www.crowdcast.io/e/architecturing-your/",
  },
];

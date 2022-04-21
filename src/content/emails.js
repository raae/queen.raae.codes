import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Button, Typography, Chip } from "@mui/material";
import { ArrowForward as MoreIcon } from "@mui/icons-material";
import { ContentList } from "../components/content-list";

export const Tags = ({ tags, sx, ...props }) => {
  return (tags || []).map(({ label, slug }) => {
    return (
      <Chip
        variant="outlined"
        size="small"
        sx={{ mr: 1 }}
        component={Link}
        to={slug}
        label={label}
        key={slug}
        clickable
      />
    );
  });
};

export const Emails = ({ emails, sx, more, ...props }) => {
  const data = useStaticQuery(graphql`
    {
      latestEmails: allEmail(sort: { order: DESC, fields: date }, limit: 7) {
        nodes {
          ...EmailItemFragment
        }
      }
    }
  `);

  const items = (emails?.nodes || data.latestEmails.nodes).map(
    ({ title, slug, emojii, date }) => {
      return {
        to: slug,
        primary: title,
        secondary: (
          <>
            <Typography component="span" sx={{ mr: 1.5 }}>
              {emojii}
            </Typography>
            {date}
          </>
        ),
      };
    }
  );

  return (
    <ContentList items={items} {...props}>
      {more && (
        <Button
          to="/emails/"
          component={Link}
          endIcon={<MoreIcon />}
          variant="outlined"
          fullWidth
          sx={{ mt: "1em" }}
        >
          More emails
        </Button>
      )}
    </ContentList>
  );
};

export default Emails;

export const query = graphql`
  fragment EmailItemFragment on Email {
    title
    description
    author
    emojii
    slug
    date(formatString: "MMMM Do, YYYY")
    tags {
      label
      slug
    }
  }
`;

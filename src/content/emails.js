import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Button, Typography, Chip } from "@mui/material";
import { ArrowForward as MoreIcon } from "@mui/icons-material";
import { ContentList } from "../components/content-list";
import parse from "html-react-parser";

export const Tags = ({ tags, sx }) => {
  return (tags || []).map(({ label, slug }) => {
    return (
      <Chip
        variant="outlined"
        size="small"
        sx={{ mr: 1, fontWeight: "normal" }}
        component={Link}
        to={slug}
        label={parse(label)}
        key={slug}
        clickable
      />
    );
  });
};

export const Emails = ({ emails, more, variant, limit, ...props }) => {
  const data = useStaticQuery(graphql`
    {
      latestEmails: allEmail(sort: { order: DESC, fields: date }, limit: 7) {
        nodes {
          ...EmailItemFragment
        }
      }
    }
  `);

  const items = (emails?.nodes || emails || data.latestEmails.nodes)
    .slice(0, limit)
    .map(({ title, description, slug, emojii, date, tags }) => {
      return {
        to: slug,
        primary: (
          <>
            <Typography variant="h5" gutterBottom={variant === "detailed"}>
              {parse(title)}
            </Typography>

            {variant === "detailed" && (
              <Typography variant="body2" gutterBottom>
                {parse(description)}
              </Typography>
            )}

            {variant === "detailed" && <Tags tags={tags} />}
          </>
        ),
        secondary: (
          <>
            <Typography component="span" sx={{ mr: 1.5 }}>
              {emojii}
            </Typography>
            {date}
          </>
        ),
      };
    });

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
          More Treasures
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

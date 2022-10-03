import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ContentList } from "./content-list";
import parse from "html-react-parser";
import { Badge } from "./badge";

export function Emails({ emails, more, variant, limit, ...props }) {
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
        primary: <>{parse(title)}</>,
        body: variant === "detailed" && (
          <>
            <p className="my-2 text-sm">{parse(description)}</p>

            <aside className="my-0">
              {tags.map(({ label }) => (
                <Badge key={label}>{parse(label)}</Badge>
              ))}
            </aside>
          </>
        ),
        secondary: (
          <>
            <span className="mr-2.5 text-base">{emojii}</span>
            {date}
          </>
        ),
      };
    });

  const ctas = [{ to: "/emails/", label: "More Daily Treasures" }];

  return <ContentList items={items} ctas={more && ctas} {...props} />;
}

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

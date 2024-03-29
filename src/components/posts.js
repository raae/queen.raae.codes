import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ContentList } from "./content-list";
import parse from "html-react-parser";
import { Badge } from "./badge";

export function Posts({ posts, more, variant, limit, ...props }) {
  const data = useStaticQuery(graphql`
    {
      latestPosts: allPost(sort: { date: DESC }, limit: 7) {
        nodes {
          ...PostItemFragment
        }
      }
    }
  `);

  const items = (posts?.nodes || posts || data.latestPosts.nodes)
    .slice(0, limit)
    .map(({ title, description, slug, date, tags }) => {
      return {
        to: slug,
        primary: <>{parse(title)}</>,
        body: variant === "detailed" && (
          <>
            <p className="my-2 text-sm">{parse(description)}</p>

            <aside className="my-0 space-x-2">
              {tags.map(({ label }) => (
                <Badge key={label}>{parse(label)}</Badge>
              ))}
            </aside>
          </>
        ),
        secondary: <>{date}</>,
      };
    });

  const ctas = [{ to: "/posts/", label: "More..." }];

  return <ContentList items={items} ctas={more && ctas} {...props} />;
}

export const query = graphql`
  fragment PostItemFragment on Post {
    title
    description
    author
    slug
    date(formatString: "MMMM Do, YYYY")
    tags {
      label
      slug
    }
  }
`;

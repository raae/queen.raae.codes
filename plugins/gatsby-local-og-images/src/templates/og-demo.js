import React, { useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

import { drawOgImage } from "../utils/open-graph-image";

const OpenGraphTestPage = () => {
  const data = useStaticQuery(graphql`
    {
      allEmails: allMarkdownRemark(
        filter: { fields: { slug: { glob: "/emails/*" } } }
        sort: { fields: fields___date, order: DESC }
      ) {
        nodes {
          excerpt
          frontmatter {
            title
            description
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (!data) return;

    data.allEmails.nodes.map(
      ({ frontmatter: { title, description }, excerpt }) => {
        const canvas = document.createElement("canvas");
        document.getElementById("content").append(canvas);
        drawOgImage(canvas, {
          title,
          avatar: "/raae-avatar.png",
          description: description || excerpt,
          height: 300,
          width: 600,
        });
      }
    );
  }, [data]);

  return (
    <main>
      <header>
        <h1>Open Graph Image Demo Page</h1>
      </header>
      <div id="content"></div>
    </main>
  );
};

export default OpenGraphTestPage;

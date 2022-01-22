import React, { useEffect } from "react";
import { graphql } from "gatsby";

import { drawImage } from "../utils/open-graph-image";

const OpenGraphTestPage = ({ data }) => {
  useEffect(() => {
    if (!data) return;

    data.allEmails.nodes.map(
      ({ frontmatter: { title, description }, excerpt }) => {
        const canvas = document.createElement("canvas");
        document.getElementById("content").append(canvas);
        drawImage(canvas, {
          title,
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

export const query = graphql`
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
`;

export default OpenGraphTestPage;

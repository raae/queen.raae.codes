import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

const OpenGraphImagesPage = () => {
  const data = useStaticQuery(graphql`
    {
      allOpenGraphImages: allImageSharp(
        filter: { original: { src: { regex: "/ogImage/g" } } }
      ) {
        nodes {
          gatsbyImageData
        }
      }
    }
  `);

  return (
    <main>
      <header>
        <h1>Open Graph Image Demo Page</h1>
      </header>
      <div>
        {data.allOpenGraphImages.nodes.map((node, i) => {
          const image = getImage(node);
          console.log(image);
          return <img src={image.images.fallback.src} alt="Open Graph Image" />;
        })}
      </div>
    </main>
  );
};

export default OpenGraphImagesPage;

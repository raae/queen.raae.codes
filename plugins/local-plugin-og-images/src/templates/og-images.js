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
          gatsbyImageData(formats: NO_CHANGE)
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
        {data.allOpenGraphImages.nodes.map((node) => {
          const gatsbyImage = getImage(node);
          const src = gatsbyImage.images.fallback.src;
          return <img src={src} key={src} alt="Open Graph" />;
        })}
      </div>
    </main>
  );
};

export default OpenGraphImagesPage;

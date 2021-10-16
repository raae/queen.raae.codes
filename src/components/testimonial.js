import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonial = ({ who, avatar, children }) => {
  return (
    <blockquote key={who}>
      <GatsbyImage image={getImage(avatar)} alt={who} />
      <p>
        {children}
        <cite>{who}</cite>
      </p>
    </blockquote>
  );
};

export default Testimonial;

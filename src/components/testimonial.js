import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonial = ({ who, avatar, testimonial }) => {
  return (
    <blockquote key={who}>
      <GatsbyImage image={getImage(avatar)} alt={who} />
      <p>
        {testimonial}
        <cite>{who}</cite>
      </p>
    </blockquote>
  );
};

export default Testimonial;

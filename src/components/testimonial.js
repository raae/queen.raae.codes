import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonial = ({ who, avatar, attended, children }) => {
  return (
    <blockquote key={who}>
      <GatsbyImage image={getImage(avatar)} alt={who} />
      <div>
        {children}
        <cite>
          {who}
          <br /> {attended && `Attended ${attended}`}
        </cite>
      </div>
    </blockquote>
  );
};

export default Testimonial;

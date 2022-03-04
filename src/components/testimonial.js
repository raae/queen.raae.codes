import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Testimonial = ({ who, url, avatar, company, attended, children }) => {
  return (
    <blockquote key={who}>
      <GatsbyImage image={getImage(avatar)} alt={who} />
      <div>
        {children}
        <cite>
          {who && !url && <>({who})</>}
          {who && url && <a href={url}>{who}</a>}

          {attended && (
            <>
              <br /> Attended ${attended}
            </>
          )}
          {company && (
            <>
              , <a href={company.url}>{company.name}</a>
            </>
          )}
        </cite>
      </div>
    </blockquote>
  );
};

export default Testimonial;

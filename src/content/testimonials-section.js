import React from "react";
import Testimonial from "../components/testimonial";

const TestimonialsSection = ({ title, intro, skipIntro, items }) => {
  return (
    <section>
      {title && !skipIntro && <h2>{title}</h2>}
      {intro && !skipIntro && <p>{intro}</p>}
      {items.map((node) => {
        const { frontmatter, html } = node.childMarkdownRemark;
        return (
          <Testimonial key={node.id} {...frontmatter}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Testimonial>
        );
      })}
    </section>
  );
};

export default TestimonialsSection;

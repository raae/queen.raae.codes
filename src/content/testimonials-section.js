import React from "react";
import Testimonial from "../components/testimonial";

const TestimonialsSection = ({ title, intro, items }) => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {intro && <p>{intro}</p>}
      {items.map((item) => (
        <Testimonial {...item} />
      ))}
    </section>
  );
};

export default TestimonialsSection;

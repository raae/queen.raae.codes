import React from "react";
import Testimonial from "../components/testimonial";

const TestimonialsSection = ({ title, intro, list }) => {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {intro && <p>{intro}</p>}
      {list.map((testimonial) => (
        <Testimonial {...testimonial} />
      ))}
    </section>
  );
};

export default TestimonialsSection;

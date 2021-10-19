import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Testimonial from "../components/testimonial";

const TestimonialsSection = ({ title, intro, items }) => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(allTestimonialsQuery);

  const testimonials = items
    .map((item) => {
      return nodes.find(({ fields }) =>
        fields.slug.includes(`testimonials/${item}/`)
      );
    })
    .filter((node) => !!node);

  return (
    <section>
      {title && <h2>{title}</h2>}
      {intro && <p>{intro}</p>}
      {testimonials.map((node) => (
        <Testimonial key={node.fields.slug} {...node.frontmatter}>
          <div dangerouslySetInnerHTML={{ __html: node.html }} />
        </Testimonial>
      ))}
    </section>
  );
};

const allTestimonialsQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { glob: "/*/_testimonials/*" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          who
          attended
          avatar {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        html
      }
    }
  }
`;

export default TestimonialsSection;

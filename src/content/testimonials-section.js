import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Testimonial from "../components/testimonial";

const TestimonialsSection = ({ title, intro, skipIntro, items }) => {
  const {
    allTestimonial: { nodes },
  } = useStaticQuery(allTestimonialsQuery);

  const testimonials = items
    .map((item) => {
      return nodes.find(({ relativePath }) => relativePath.includes(item));
    })
    .filter((node) => !!node);

  return (
    <section>
      {title && !skipIntro && <h2>{title}</h2>}
      {intro && !skipIntro && <p>{intro}</p>}
      {testimonials.map((node) => {
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

const allTestimonialsQuery = graphql`
  {
    allTestimonial {
      nodes {
        id
        relativePath
        childMarkdownRemark {
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
  }
`;

export default TestimonialsSection;

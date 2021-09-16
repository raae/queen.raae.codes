import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Seo from "../components/seo";
import DefaultLayout from "../templates/default";

const PageTemplate = ({ data, ...props }) => {
  const post = data.markdownRemark;

  const image = getImage(post.frontmatter.featuredImage);

  return (
    <DefaultLayout>
      <Seo {...props} meta={{ title: post.frontmatter.title }} />
      <header>
        {/* <aside>
          <nav style={{ position: "absolute", top: "2rem" }}>
            <ul>
              <li>
                <Link to="/">Queen Raae</Link>
              </li>
              <li>
                <Link path="/talks">Talks</Link>
              </li>
            </ul>
          </nav>
        </aside> */}
        <h1>{post.frontmatter.title}</h1>

        <GatsbyImage image={image} alt={post.frontmatter.title} />
      </header>

      <section dangerouslySetInnerHTML={{ __html: post.html }} />
    </DefaultLayout>
  );
};

export default PageTemplate;

export const query = graphql`
  query PageBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`;

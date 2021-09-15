import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ location, meta, children, image }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            tagline
            description
            twitter
            keywords
            url
          }
        }
      }
    `
  );

  const title = meta?.title;

  const description = meta?.description || siteMetadata.description;
  const canonical = location && `${siteMetadata.url}${location.pathname}`;
  const socialType = meta?.type || "website";
  const socialTitle = title
    ? `${siteMetadata.title}: ${title}`
    : `${siteMetadata.title} — ${siteMetadata.tagline}`;
  const socialDescription = description;

  return (
    <Helmet
      titleTemplate={`%s / ${siteMetadata.title} — ${siteMetadata.tagline}`}
      defaultTitle={`${siteMetadata.title} — ${siteMetadata.tagline}`}
    >
      <html lang="en" />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />

      <meta name="description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={socialType} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      {/* <meta property="og:image" content="" /> */}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      {/* <meta name="twitter:image" content="" /> */}

      {children}
    </Helmet>
  );
};

export default Seo;

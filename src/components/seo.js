import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ location, meta, children }) => {
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
            url
            lang
          }
        }
      }
    `
  );

  const title = meta?.title;
  const siteName = `${siteMetadata.title} — ${siteMetadata.tagline}`;
  const lang = meta?.lang || siteMetadata.lang;

  const description = meta?.description || siteMetadata.description;
  const canonical = location && `${siteMetadata.url}${location.pathname}`;
  const socialType = meta?.type || "website";
  const socialTitle = title ? title : siteName;
  const socialDescription = description;
  const twitterSite = siteMetadata.twitter;
  const twitterCreator = meta?.creator;

  return (
    <Helmet titleTemplate={`%s / ${siteName}`} defaultTitle={siteName}>
      <html lang={lang} />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />

      <meta name="description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={socialType} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:site_name" content={siteName} />
      {/* <meta property="og:image" content="" /> */}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      {/* <meta name="twitter:image" content="" /> */}

      {children}
    </Helmet>
  );
};

export default Seo;

import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const PageHead = ({ location, meta, children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteName
            siteTagline
            siteDescription
            siteUrl
            siteSocialImage
            siteSocialImageAlt
            siteTwitterCreator
          }
        }
      }
    `
  );
  const {
    siteName,
    siteTagline,
    siteDescription,
    siteUrl,
    siteSocialImage,
    siteSocialImageAlt,
    siteTwitterCreator,
  } = siteMetadata;

  const siteTitle = `${siteName} — ${siteTagline}`;
  const title = meta?.title ? `${meta.title}  —  ${siteName}` : siteTitle;
  const image = meta?.image || siteSocialImage;

  const description = meta?.description || siteDescription;
  const canonical = location && `${siteUrl}${location.pathname}`;
  const socialType = meta?.type || "website";
  const socialTitle = title ? title : siteName;
  const socialImage = image && `${siteUrl}${image}`;
  const socialImageAlt = meta?.image ? meta?.alt : siteSocialImageAlt;
  const socialDescription = description;
  const twitterSite = siteTwitterCreator;
  const twitterCreator = meta?.creator || siteTwitterCreator;
  const twitterCard = "summary_large_image";

  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👑</text></svg>"
      />

      <meta name="description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content={socialType} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image:src" content={socialImage} />
      <meta name="twitter:image:alt" content={socialImageAlt} />

      {children}
    </>
  );
};

export default PageHead;

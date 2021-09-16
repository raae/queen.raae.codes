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
            image
          }
        }
      }
    `
  );

  const title = meta?.title;
  const siteName = `${siteMetadata.title} — ${siteMetadata.tagline}`;
  const lang = meta?.lang || siteMetadata.lang;
  const image = meta?.image || siteMetadata.image;

  console.log({ location });

  const description = meta?.description || siteMetadata.description;
  const canonical = location && `${siteMetadata.url}${location.pathname}`;
  const socialType = meta?.type || "website";
  const socialTitle = title ? title : siteName;
  const socialImage = image && location && `${location.origin}/${image}`;
  const socialDescription = description;
  const twitterSite = siteMetadata.twitter;
  const twitterCreator = meta?.creator;
  const twitterCard = "summary_large_image";

  return (
    <Helmet titleTemplate={`%s / ${siteName}`} defaultTitle={siteName}>
      <html lang={lang} />
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👑</text></svg>"
      />

      <meta name="description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={socialType} />
      <meta property="og:title" content={socialTitle} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:title" content={socialTitle} />
      <meta name="twitter:description" content={socialDescription} />
      <meta name="twitter:image" content={socialImage} />

      {children}
    </Helmet>
  );
};

export default Seo;

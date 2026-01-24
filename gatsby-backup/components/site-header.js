import * as React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import GitbubIcon from "../icons/icons8-github-50.svg";
import TwitterIcon from "../icons/icons8-twitter-circled-50.svg";
import YouTubeIcon from "../icons/icons8-youtube-50.svg";
import SearchIcon from "../icons/icons8-search-50.svg";

function SomeIcon({ url }) {
  if (url.includes("github")) {
    return <GitbubIcon />;
  } else if (url.includes("twitter")) {
    return <TwitterIcon />;
  } else if (url.includes("youtube")) {
    return <YouTubeIcon />;
  } else {
    return null;
  }
}

export default function SiteHeader() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteSocialMedia
        }
      }
    }
  `);
  return (
    <header className="sticky top-0 backdrop-blur-lg z-50 bg-[#fffaf0b3] border-solid border-0 border-t-4 border-[#ff5722]">
      <div className="mx-auto max-w-4xl">
        <nav className="py-3 px-4 flex items-center gap-3">
          <Link
            to="/"
            className="text-xl mr-auto hover:scale-110 transition-transform no-underline"
          >
            👑
            <span className="sr-only">Queen Raae</span>
          </Link>

          <Link
            to="/search"
            className="[&>*]:h-5 [&>*]:w-5 translate-y-px hover:scale-110 transition-transform mr-4"
          >
            <SearchIcon />
          </Link>
          {data.site.siteMetadata.siteSocialMedia.map((url) => {
            return (
              <a
                href={url}
                key={url}
                target="__blank"
                rel={"noreferrer"}
                className="[&>*]:h-6 [&>*]:w-6 hover:scale-110 transition-transform"
              >
                <SomeIcon url={url} />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

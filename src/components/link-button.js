import * as React from "react";
import { IconButton } from "@mui/material";

import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  YouTube as YouTubeIcon,
  Language as WebsiteIcon,
} from "@mui/icons-material";

const urlMapper = (url) => {
  if (url.includes("twitter.com")) {
    return {
      Icon: TwitterIcon,
      label: "Twitter",
    };
  } else if (url.includes("github.com")) {
    return {
      Icon: GitHubIcon,
      label: "GitHub",
    };
  } else if (url.includes("youtube.com")) {
    return {
      Icon: YouTubeIcon,
      label: "YouTube",
    };
  } else {
    return {
      Icon: WebsiteIcon,
      label: url.replace("http://", "").replace("https://", ""),
    };
  }
};

const LinkButton = ({ url, ...props }) => {
  const { label, Icon } = urlMapper(url);

  return (
    <IconButton component="a" title={label} href={url} {...props}>
      <Icon />
    </IconButton>
  );
};

export default LinkButton;

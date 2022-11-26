---
title: Styling broken images (with Tailwind and React)
tags: tailwind, react
---

After using [pruneyourfollows.com](https://pruneyourfollows.com) for a couple of weeks, I started seeing broken image avatars. The app does not import data for unfollowed accounts; at some point, the imported image avatars break, and it look like this:

![Broken image looking bad](./broken-image.png)

Shai Schechter to the rescue! He climbed onboard for Friday's [unauthorized and rum-fueled treasure hunt](https://youtu.be/7FiUfiyJXt8) in the sharky waters around the Gatsby islands to help us out.

![Screendump of stream](./screen-dump.png)

He proposed listing for the image's load and error events to determine its status. It also meant we could add a nice pulsating style while loading.

```jsx
import clsx from "clsx";
import React, { useState } from "react";

export function Avatar({ imageUrl, altText, className }) {
  const [status, setStatus] = useState("loading");

  const handleOnLoad = () => {
    setStatus("fulfilled");
  };

  const handleOnError = () => {
    setStatus("failed");
  };

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-full border bg-slate-400",
        status === "loading" ? "animate-pulse" : "",
        className
      )}
    >
      <img
        className={clsx(
          status === "fulfilled" ? "visible" : "hidden",
          "w-full"
        )}
        src={imageUrl}
        alt={altText}
        onLoad={handleOnLoad}
        onError={handleOnError}
      />
    </div>
  );
}
```

Full disclosure: I set it up as `status === "failed" ? "hidden" : "visible"` (flipped logic) to begin with, but that resulted in a flicker of a broken image and, to be honest, hiding until success makes much more sense!

All the best,  
Queen Raae

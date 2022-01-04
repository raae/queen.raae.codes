---
title: Third party scripts with Gatsby
emojii: 🔴 👩‍🏫
---

Let's say you want to embed a Tweet, or add website analytics. How would you go about including the external third party script required?

That was the topic for my first ever Live Screencasts — concise, instructional videos on a single Gatsby topic.

- [Watch the Live Screeencast](https://youtu.be/Kldx6d5XBSE)

I have found three practical ways of doing so with Gatsby.

## 1. `onRenderBody`

A great solution for global scripts that need to be available on every page such as website analytics.

With `onRenderBody` the script is added when the site statically generates, meaning the added script tag is part of the initial html even before the site rehydrates.

- [Jump in to `onRenderBody`](https://www.youtube.com/watch?v=Kldx6d5XBSE&t=74s)

```
import React from "react";

const headComponents = [
  <script
    key="fathom-script"
    src="https://cdn.usefathom.com/script.js"
    data-site="CNOZPPSE"
    defer
  ></script>,
];

export const onRenderBody = ({setHeadComponents}) => {
  setHeadComponents(headComponents);
};
```

## 2. React Helmet

Using React Helmet is another method for adding the script as part of the statically generated pages. However it makes it easy to include the script only on certain pages.

- [Jump in to React Helmet](https://www.youtube.com/watch?v=Kldx6d5XBSE&t=360s)

```
import React from "react";
import {Helmet} from "react-helmet";

const TweetPageReactHelmet = () => {
  return (
    <main>
      <Helmet>
        <script async src="https://platform.twitter.com/widgets.js" />
      </Helmet>

      <section>
        <blockquote class="twitter-tweet">
          {/* ... rest of tweet embed code */}
        </blockquote>{" "}
      </section>
    </main>
  );
};

export default TweetPageReactHelmet;
```

## 3. `document.createElement`

If you would like to have more control over when a script is loaded you can do so by manipulating the DOM inside a `useEffect` (or `onClick` or another event that makes sense...).

- [Jump in to `document.createElement`](https://www.youtube.com/watch?v=Kldx6d5XBSE&t=619s)

```
import React, {useEffect} from "react";

const TweetPageCreateElement = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <main>
      <section>
        <blockquote class="twitter-tweet">
          {/* ... rest of tweet embed code */}
        </blockquote>
      </section>
    </main>
  );
};

export default TweetPageCreateElement;
```

&nbsp;  
Have you used any of these?  
Do you know of another way?

&nbsp;  
All the best,  
Queen Raae

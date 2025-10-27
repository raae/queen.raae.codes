---
title: Copy current URL with a Framer Code Override
tags: framer, code override, react, clipboard api
brands: Framer
---

I've been browsing the [Framer community forum](https://www.framer.community/) lately as I'm working on an updated [Outseta Framer Plugin](https://www.framer.com/marketplace/plugins/outseta/).

There I found a [question about how to add a "copy link" code override](https://www.framer.community/c/developers/copy-current-page-link-button-cms-supported) and threw together a code override.

## What are Code Overrides?

Code overrides are Higher Order React Components that wrap around "stuff" on the Framer canvas. So if you are a React developer, you can use code overrides to add all sorts of functionality to a Framer site.

Framer is really onto something here with seperating design from functionality 🤩

## The Ask

Copy the current page URL to the clipboard with a Code Override.

## The Solution

A lightweight Code Override that adds copy-to-clipboard functionality to any element.

## The Code

```typescript
import { forwardRef, type ComponentType } from "react";

export function withCopyURL(Component): ComponentType {
  return forwardRef((props, ref) => {
    const handleClick = async () => {
      try {
        const currentURL = window.location.href;
        await navigator.clipboard.writeText(currentURL);
        console.log("URL copied to clipboard:", currentURL);
      } catch (err) {
        console.error("Failed to copy URL:", err);
      }
    };

    return <Component ref={ref} {...props} onClick={handleClick} style={{ cursor: "pointer" }} />;
  });
}
```

## How to Use It

1. In Framer, open the **Assets** panel and go to the **Code** tab
2. Click the **+** button to create a new Code Override file and name it
3. Paste the code above into the file
4. Select any element on your canvas (a button, icon, or text layer)
5. In the properties panel, find **Code Override** and select `withCopyURL`

That's it! Now when someone clicks that element, the current page URL gets copied to their clipboard.

You can add visual feedback like hover states or tap animation in the Framer canvas.

## Going Further

You could extend this Code Override to:

- Show a toast notification after copying ("Link copied!")
- Copy a custom URL instead of the current one (great for referral links)
- Track copy events in your analytics

&nbsp;
**PS:** The Clipboard API works in all modern browsers, but it requires a secure context (HTTPS). It'll work fine on your published Framer site, but might act up on localhost without HTTPS.

---
title: Three render modes your Framer components should handle
tags: Framer, Code Components, Code Overrides, RenderTarget
brands: Framer, Outseta
---

If you're building code components or code overrides for [Framer](https://framer.link/queen-raae), you'll want to handle three different render modes: canvas, preview, and live.

**Canvas** — The Framer editor. Your component is rendered as a static preview while designing.

**Preview** — Preview mode. Interactive, but still in the Framer environment.

**Live** — The published site where custom code such as the Outseta script executes.

Unexpectedly (at least to me 😆), Framer's `RenderTarget` returns "preview" for both preview and live as I've defined them. This makes sense for design, but not for more app-like functionality as I've found out while building [Outseta](https://outseta.com/?via=queen) code overrides and components that depend on the execution of custom code.

## The Solution

After some trial and error, I found the most robust way to distinguish between preview and live is to check the hostname. If it includes "framercanvas.com", it's preview, otherwise it's live.

Live is intentionally the fallback mode, so if Framer changes the preview hostname the component will still work as expected in the more crucial live mode.

```tsx
import { RenderTarget } from "framer";

type RenderMode = "canvas" | "preview" | "live";

function getRenderMode(): RenderMode {
  const renderTarget = RenderTarget.current();

  if (renderTarget === RenderTarget.canvas) {
    return "canvas";
  } else if (renderTarget === RenderTarget.preview && window?.location.host.includes("framercanvas.com")) {
    return "preview";
  } else {
    return "live";
  }
}
```

## Why not do feature checks instead?

This is a valid approach — we could check for the presence of the Outseta script and only continue with Outseta logic if present:

```tsx
if (typeof Outseta !== "undefined") {
  // Outseta is available, do the thing
}
```

This handles the error, but it doesn't give you control over the designer experience. With feature checks alone we're not asking "what experience should I provide for this mode?"

With explicit mode handling you can, for example:

- Add props like `showOnPreview` to force a specific state, letting designers preview logged-in views without having to publish
- Write to the console in live mode when the Outseta script is missing and remove the component — but in preview mode a missing script is expected, so no need to clutter the console with warnings
- Skip analytics events in canvas and preview — only fire them in live mode
- And so on...

## Key Takeaways

- **Framer code runs in three modes:** canvas, preview, and live — each needs different behavior
- **External scripts only run in live mode** — your code needs fallbacks for canvas and preview
- **Live as fallback is intentional** — if Framer changes their preview hostname, your published site still works
- **Mode checks > feature checks** — they give you control over the designer experience, not just error avoidance

What is your approach to handling render modes in Framer? Are there edge cases I haven't covered? I'd love to hear about it.

Happy building! 🛠️

---
title: Framer Code Override Not Showing? Add ComponentType
tags: Code Overrides, React, HOC, ComponentType
brands: Framer
---

I've seen this question pop up in the [Framer](https://framer.link/queen-raae) community more than a [few times](https://www.framer.community/c/developers/need-help-override-not-showing-in-dropdown-menu): "I wrote a code override, but it's not showing up in the dropdown!" 😤

It's frustrating because the code looks right, it's in the right place, but Framer just... ignores it. Something I also personally experienced when creating my first [Outseta](https://outseta.com/?via=queen) code overrides.

## The Problem

Here's what usually happens. You write what feels like a perfectly reasonable code override:

```typescript
// ❌ This won't show up in the override panel
import { forwardRef } from "react";

export const WithClick = (Component) => {
  return forwardRef((props, ref) => {
    const handleClick = () => {
      console.log("Clicked!");
    };

    return <Component {...props} ref={ref} onClick={handleClick} />;
  });
};
```

You save the file, go back to the Framer canvas, and... nothing. The override doesn't appear in the dropdown. No error message, no explanation. It's like your code doesn't even exist.

## The Solution

Framer has specific requirements for code overrides to show up in the panel. It's not just about writing a function - the function needs to follow a particular **signature** that Framer recognizes.

Specifically, code overrides must be properly typed with React's `ComponentType` as the return type.

```typescript
// ✅ This will show up in the override panel
import { forwardRef, ComponentType } from "react";

export const WithClick = (Component): ComponentType => {
  return forwardRef((props, ref) => {
    const handleClick = () => {
      console.log("Clicked!");
    };

    return <Component {...props} ref={ref} onClick={handleClick} />;
  });
};
```

That's it. The `ComponentType` return type annotation is what tells Framer "hey, this is a valid override!" Without it, Framer has no way to know your function is meant to be an override.

This isn't really explained in the error messages (because there are no error messages 🤦‍♀️), and it's not super obvious from the docs either. But once you know it, it makes sense and now you know 🥳

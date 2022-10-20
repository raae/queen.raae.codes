---
title: Why not go for the simple solution?
emojii: ⁉️ ⁉️
tags: database, architecture, slow&steady
---

Last week on Slow&Steady, the podcast where we build products in public, [we talked about how the simple solution is often the right solution](https://twitter.com/SlowSteadyPod/status/1582627389950988288?s=20&t=frrX5_RPqFJmSR-UvMm-5A).

[![Screenshot of audiogram tweet](./twitter.com_SlowSteadyPod.jpg)](https://twitter.com/SlowSteadyPod/status/1582627389950988288?s=20&t=frrX5_RPqFJmSR-UvMm-5A)

And this week, I realized the denormalization I was doing for Prune your Follows is not really needed. No worries if the Twitter account info repeats for each app user following that account.

<aside class="notice">

Prune your Follows lets you import and filter everyone you follow on Twitter to find accounts to unfollow.

</aside>

So instead of two tables:

```
account
  - id
  - username
  - name
  - a lot more

follows
  - account
  - followed_by
```

we can go with one table:

```
account
  - id
  - username
  - name
  - followed_by
  - a lot more
```

By doing it the denormalized way, we skip all kinds of complexity that comes with joining tables. For instance, it made it much easier to add the search functionality we created on [tonight's treasure hunt](https://youtu.be/Xr-s0Hg_45w) for instance.

&nbsp;

All the best,  
Queen Raae

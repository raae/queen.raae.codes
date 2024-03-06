---
title: Lost in a sea of local branches? `--sort` might help!
emojii: 🗓 ⬇️
tags: git, snippet
---

If you are like me, never really cleaning up your local Git branches, you might feel a little lost when coming back to a project.

But I have a handy tip for us:

```
git branch --sort=-committerdate  # DESC
```

Sorting branches by the last commit date are super duper handy; you can even flip it around and get a list of the branches we maybe should stop hoarding.

```
git branch --sort=committerdate  # ASC
```

&nbsp;  
All the best,  
Queen Raae

**PS**: Are you close to London? Today at 17:00, there is an informal piratical get-together in Chelsea with the Pirate Princess and me. Reply, and I'll send you the details.

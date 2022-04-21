---
title: My titles are too similar - added a title similarity threshold
emojii: 🤪 📑
tags: graphql, resolver
---

In [yesterday](/emails/2022-04-20-related-content-article/)'s email I recommended reading the article [How to Create List of Related Content in Gatsby.JS](https://reckoning.dev/blog/related-posts-gatsbyjs/).

I liked the approach of using both titles and tags to find similar content, especially since I can be a little sloppy with my tags and have not retroactively added it all emails yet.

However, my titles are a little too similar... Loads of "How to" and "Gatsby" give us some false positives.

The similarity is calculated using: # of matching tags + 3.0 \* title string similarity in the article.

I decided to remove "Gatsby" from the titles when comparing and set a threshold for when title similarity is activated to combat my issue.

I wanted to play around with the threshold, so I made it an argument so I would not have to run develop again and again to test threshold changes.

```js
exports.createResolvers = ({ createResolvers }) =>
  createResolvers({
    QueenEmail: {
      relatedEmails: {
        type: "[QueenEmail!]",
        args: { limit: "Int", titleTreshold: "Float" },
        async resolve(source, args, context, info) {
          const limit = args.limit || 3;
          const titleTreshold = args.titleTreshold || 0.7;

          let otherEmails = await context.nodeModel.runQuery({
            firstOnly: false,
            type: `QueenEmail`,
            query: {
              filter: {
                slug: {
                  ne: source.slug,
                }, // not current email
              },
            },
          });

          return otherEmails
            .map((email) => {
              const intersectingTags = intersectionBy(
                source.tags,
                email.tags,
                "slug"
              );

              const titleScore = stringSimilarity.compareTwoStrings(
                source.title.replace("Gatsby", ""),
                email.title
              );

              // titleSimilarity = 0 if treshold is not met
              const titleSimilarity =
                titleScore > titleTreshold ? titleScore : 0;

              return {
                ...email,
                similarity: intersectingTags.length + 3.0 * titleSimilarity,
              };
            })
            .filter(({ similarity }) => similarity !== 0)
            .sort((a, b) => {
              return b.similarity - a.similarity;
            })
            .slice(0, limit);
        },
      },
    },
  });
```

What would you compare?

&nbsp;  
All the best,  
Queen Raae

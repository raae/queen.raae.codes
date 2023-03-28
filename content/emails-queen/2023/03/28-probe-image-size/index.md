---
title: Little helper to check on images > probe-image-size
tags: images
projects: Search Demo
brands: Xata
---

I needed to weed out accounts with broken images for the search demo I've been working on. It doesn't look so good with random broken images when demoing.

The reason for the broken images is that it's been a while since I imported these accounts. So folks have changed their profile image, and some have left the platform. Instead of reimporting the roughly 5000 accounts I follow, I removed the ones with a broken image.

To do so, I used probe-image-size because it throws an error when the image probed is unavailable. Meaning my code would be super tidy without me writing a helper function. I've used it before to probe for an image's size, the actual use case, when doing Gatsby Image CDN stuff, as it needs to know the size of the original image, and sometimes all you have is an URL.

But back to the task at hand:

1️⃣ Get all account records\
2️⃣ Probe each account profile image\
3️⃣ Delete the account record if the image is unavailable

```js
// 1️⃣ Get account records
let page = await xata.db.accounts
  .select(["id", "username", "meta.profile_image_url"])
  .getPaginated({
    pagination: {
      size: 20,
    },
  });

const deleteBrokenImage = async (record) => {
  try {
    // 2️⃣ Probe each account profile image
    await probe(record.meta.profile_image_url);
    console.log("Do not delete ", record.username);
  } catch (error) {
    // 3️⃣ Delete the account record if the image is unavailable
    await xata.db.accounts.delete(record.id);
    console.log("Deleted ", record.username);
  }
};

await Promise.all(page.records.map(deleteBrokenImage));
```

I've skipped pagination, so the example code will only go through the first 20 records. For the following 20 records and so forth, you'd need to do `await page.nextPage()`.

For the complete code, look at the [demo code on Github](https://github.com/queen-raae/xata-search-three-ways-demo/blob/main/src/api/clean.js).

&nbsp;

All the best,\
Queen Raae

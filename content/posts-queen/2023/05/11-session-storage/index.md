---
title: Keeping things around until the session ends
tags: sessionStorage
brands: Outseta
---

As mentioned when talking about [search params](/posts/2023-05-06-url-search-params/), an [Outseta](http://www.outseta.com?via=queen) customer wanted to pass along the UTM search params to the Outseta SignUp widget so that a visitor who came in through _https://example.com?utm_source=facebook&utm_medium=paid_social&utm_campaign=summer_sale_ gets attributed to the summer sale paid Facebook ad.

The vistor might not sign up at the first page they land on, so it makes sense to keep the UTM search params around for the entirety of the session.

Vanilla JS again has our backs:

```js
var params = new URL(window.location).searchParams;
var utmSource = params.get("utm_source");
var utmCampaign = params.get("utm_campaign");
var utmMedium = params.get("utm_medium");

if (UtmSource || UtmCampaign || UtmMedium) {
  try {
    sessionStorage.setItem("UtmSource", utmSource);
    sessionStorage.setItem("UtmCampaign", utmCampaign);
    sessionStorage.setItem("UtmMedium", utmMedium);
  } catch (error) {
    console.warn("Could not save UTM params to session storage");
  }
}
```

The try block is essential because turning off cookies in a browser also disables session storage as it can be used for the same purposes (tracking people) as you see here. So you want to make sure you handle that.

In addition, if you add this script to every page, the values will be overridden by empty strings on subsequent page visits. Therefore we add that if statement to ensure we have all the values we expect a visitor landing on a page from our campaign to have. Make sure to tweak this to your use case!

&nbsp;

All the best,\
Queen Raae

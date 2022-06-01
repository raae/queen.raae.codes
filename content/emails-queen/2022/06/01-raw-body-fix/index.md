---
title: Raw body works in develop from v4.16
emojii: λ 🎉
tags: serverless, lamda, raw body, webhook
---

As mentioned in [Stripe Event validation in a Gatsby Serverless Function](/emails/2022-05-19-stripe-verification/), getting the raw body in a Gatsby Serverless Functions did not work in development.

Luckily the framework team at Gatsby agreed it was a bug and fixed it. It looks like it will ship with Gatsby v4.16.

I got it working today using 4.16.0-next.1.

```bash
yarn add gatsby@4.16.0-next.1
```

&nbsp;  
All the best,  
Queen Raae

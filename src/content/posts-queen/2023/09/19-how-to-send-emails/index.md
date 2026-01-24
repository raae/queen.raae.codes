---
title: How to send an email in 10 days from your app?
brands: Outseta, ConvertKit, Userlist, SendGrid, Mandrill, Resend, RabbitMQ, Inngest
---

How would you send an email 10 days from now in your app?

Below is a cleaned-up version of my response to [Aditya Malani](https://twitter.com/Sniper2804/status/1701883884936548765) when he asked this question on x-bird app.

**Drip Campaigns:** Platforms like [Userlist](https://userlist.com/), [ConvertKit](https://convertkit.com/), or [Outseta](https://outseta.com/?via=queen) offer capabilities to set up drip campaigns with delays you may trigger from your app.

**Email Scheduling:** Services like like [SendGrid](https://sendgrid.com/) and [Mailchimp Transactional](https://mailchimp.com/features/transactional-email) let you schedule emails in the future.

**Cron job:** Set up a cron job (for Node, there is [node-cron](https://github.com/node-cron/node-cron)) to periodically check the time since the event and send an email through providers such as [Resend](https://resend.com/) when the elapsed time hits 10 days.

**Queues:** Last but not least, you may use a queue solution with delay capabilities like [RabbitMQ](https://www.rabbitmq.com/) or [Inngest](https://www.inngest.com/) with SendGrid, Resend etc.

Any I missed? Any your favorite way?

All the best,\
Queen Raae

PS: Remember to move your Gatsby Cloud sites soon (mostly a reminder to myself).

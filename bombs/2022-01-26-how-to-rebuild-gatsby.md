---
url: https://discord.com/channels/484383807575687178/537691356487876624/935863047891877918
---

DINO — Today at 12:45 PM
Thanks. Same thing if I used a headless CMS?
raae (queen.raae.codes) — Today at 12:46 PM
Yes
DINO — Today at 12:46 PM
So every time I change something in my CMS I need to go to my hosting page and starts a rebuild, right?
raae (queen.raae.codes) — Today at 12:47 PM
You usually set that up to happen automatically by using a webhook at the hosting provider. But yes the site will have to be rebuilt when content changes for SSG and DSG to work.
DINO — Today at 12:49 PM
That would possible if the headless CMS provides the webhook and the hosting provider provides a rebuilt via a webhook, right?
raae (queen.raae.codes) — Today at 12:50 PM
The headless CMS would have a setting where you add the url of the hosting provider's webhook. So it calls it every time the content has changed.
DINO — Today at 12:51 PM
Okay. What are the most common hosting providers for Gatsby?
Apart of Gatsby cloud
raae (queen.raae.codes) — Today at 12:53 PM
Netlify I beleive, but some CMS have a deeper integration with Gatsby Cloud. For instance Sanity.
raae (queen.raae.codes) — Today at 12:54 PM
If your are not using DSG or Serverless functions you can build the site using gatsby build and upload to any static host. Like GituHub pages I beleive.
DINO — Today at 12:55 PM
Thanks. My dream stack would be to use Excel spreadsheets from Google docs as the source of data as the website would an ecommerce one.
I don't think it would be possible in this case as I can't set up the webhook on Google docs.
raae (queen.raae.codes) — Today at 12:58 PM
Another approach is to set up a GitHub action, or a Zapier flow to call the webhook every hour or so. This will then rebuild your site and pull in the new data.
DINO — Today at 12:58 PM
Lovely. Thank you very much for your valuable insight.
raae (queen.raae.codes) — Today at 12:59 PM
There also seems to be the possibility of calling a webhook when a google doc changes: https://developers.google.com/drive/api/v3/push

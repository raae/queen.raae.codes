import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://queen.raae.codes',
  trailingSlash: 'always',
  redirects: {
    '/emails/2021-12-02-conference-buddy-2.0/': '/posts/2021-12-02-conference-buddy-v2/',
    '/emails/2022-03-30-determenistic/': '/posts/2022-03-30-deterministic/',
    '/emails/2022-05-18-this-week/': '/posts/2022-05-18-dynamic-serverless/',
    '/emails/2022-09-06-this-week/': '/posts/2022-09-05-this-week/',
    '/emails/2022-09-29-croco-clock/': '/posts/2022-10-13-croco-clock/',
    '/emails/2023-02-01-netlify+gatsby/': '/posts/2023-02-01-netlify-gatsby/',
    '/emails/welcome/': '/subs/welcome/',
    '/emails/reminders/': '/subs/reminders/',
    '/emails/preferences/': '/subs/preferences/',
    '/emails/[...slug]': '/[...slug]',
    '/react-norway/': '/speaker/2022-06-24-react-norway/',
    '/gatsby-fall-camp-2021/': '/speaker/2021-09-16-gatsby-fall-camp/',
    '/mpya/': '/speaker/2021-12-15-mpya/',
    '/jam/': '/speaker/2022-11-08-jamstackconf/',
    '/modern/': '/speaker/2022-12-17-modern-frontends/',
  },
  image: {
    // Skip processing for GIF files which can be too large
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  integrations: [
    react(),
    mdx(),
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude certain pages from sitemap
        const excludedPaths = [
          '/posts/preferences/',
          '/posts/welcome/',
          '/posts/reminders/',
          '/search/',
        ];
        return !excludedPaths.some(path => page.includes(path)) &&
               !page.includes('/tag/'); // Exclude tag archives
      }
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['clsx', 'date-fns'],
    },
  },
});

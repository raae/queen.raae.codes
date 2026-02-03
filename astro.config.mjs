import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://queen.raae.codes',
  trailingSlash: 'always',
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

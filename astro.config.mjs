import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://queen.raae.codes',
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    // sitemap(), // NOTE: Sitemap causes build error - needs investigation
  ],
  output: 'static',
  adapter: netlify(),
  markdown: {
    syntaxHighlight: 'prism',
  },
  image: {
    service: {
      config: {
        limitInputPixels: false,
      },
    },
  },
});

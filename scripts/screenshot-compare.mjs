import { chromium } from '@playwright/test';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const GATSBY_BASE = 'https://queen.raae.codes';
const ASTRO_BASE = 'http://localhost:4321';

const WIDTHS = [375, 768, 1280];

// Key pages to compare - representative sample
const PAGES = [
  '/',
  '/posts/',
  '/speaker/',
  '/search/',
  '/subs/',
  '/subs/welcome/',
  '/subs/preferences/',
  '/subs/reminders/',
  '/emergency/',
  '/gatsby-emergency/',
  '/gatsby-code-review/',
  '/dev-task-cheatsheet/',
  '/react-gotchas/',
  '/done-for-you-demo/',
  '/ruby/',
  '/gatsby-bootcamps/v4/',
  '/gatsby-bootcamps/authentication/',
  '/gatsby-bootcamps/first-function/',
  '/gatsby-bootcamps/payment/',
  // A few blog posts
  '/2022-01-10-new-year-new-pirate/',
  '/2021-12-21-the-2021-round-up/',
  '/2021-10-11-serverless-sending-emails/',
  // Tag pages
  '/tag/gatsby/',
  '/tag/newsletter/',
  // Speaker detail pages
  '/speaker/2021-09-16-gatsby-fall-camp/',
];

const SCREENSHOT_DIR = '/tmp/screenshot-compare';

async function run() {
  // Create directories
  for (const dir of ['gatsby', 'astro']) {
    for (const w of WIDTHS) {
      const d = join(SCREENSHOT_DIR, dir, String(w));
      mkdirSync(d, { recursive: true });
    }
  }

  const browser = await chromium.launch();

  for (const width of WIDTHS) {
    console.log(`\n=== Width: ${width}px ===`);
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });

    for (const pagePath of PAGES) {
      const safeName = pagePath.replace(/\//g, '_').replace(/^_/, '').replace(/_$/, '') || 'index';

      // Screenshot Gatsby
      const gatsbyPage = await context.newPage();
      try {
        await gatsbyPage.goto(`${GATSBY_BASE}${pagePath}`, { waitUntil: 'networkidle', timeout: 30000 });
        await gatsbyPage.waitForTimeout(1000); // Allow lazy loading
        const gatsbyPath = join(SCREENSHOT_DIR, 'gatsby', String(width), `${safeName}.png`);
        await gatsbyPage.screenshot({ path: gatsbyPath, fullPage: true });
        console.log(`  OK gatsby ${width}px ${pagePath}`);
      } catch (e) {
        console.log(`  FAIL gatsby ${width}px ${pagePath}: ${e.message.substring(0, 80)}`);
      }
      await gatsbyPage.close();

      // Screenshot Astro
      const astroPage = await context.newPage();
      try {
        await astroPage.goto(`${ASTRO_BASE}${pagePath}`, { waitUntil: 'networkidle', timeout: 15000 });
        await astroPage.waitForTimeout(500);
        const astroPath = join(SCREENSHOT_DIR, 'astro', String(width), `${safeName}.png`);
        await astroPage.screenshot({ path: astroPath, fullPage: true });
        console.log(`  OK astro  ${width}px ${pagePath}`);
      } catch (e) {
        console.log(`  FAIL astro  ${width}px ${pagePath}: ${e.message.substring(0, 80)}`);
      }
      await astroPage.close();
    }

    await context.close();
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${SCREENSHOT_DIR}`);
  console.log('Compare with: open /tmp/screenshot-compare/');
}

run().catch(console.error);

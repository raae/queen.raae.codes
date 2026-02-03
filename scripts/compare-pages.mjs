import { chromium } from '@playwright/test';
import fs from 'fs';

const GATSBY_BASE = 'https://queen.raae.codes';
const ASTRO_BASE = 'http://localhost:4321';

// Key pages to compare first (non-blog)
const keyPages = [
  '/',
  '/posts/',
  '/speaker/',
  '/speaker/2022-06-24-react-norway/',
  '/speaker/2022-11-08-jamstackconf/',
  '/speaker/2021-12-15-mpya/',
  '/speaker/2022-12-17-modern-frontends/',
  '/speaker/2021-09-16-gatsby-fall-camp/',
  '/speaker/2017-10-06-mobile-era/',
  '/subs/',
  '/subs/welcome/',
  '/subs/preferences/',
  '/subs/reminders/',
];

// Sample blog posts to compare
const samplePosts = [
  '/2025-12-09-framer-render-modes/',
  '/2025-10-27-framer-copy-button/',
  '/2025-05-19-ai-client-side-only/',
  '/2024-10-17-balance/',
  '/2023-09-04-jamstack-is-dead/',
  '/2022-03-17-demo/',
  '/2022-01-04-tag-pages/',
  '/2022-10-13-croco-clock/',
];

async function getPageContent(page, url) {
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    if (!response || response.status() !== 200) {
      return { status: response?.status() || 0, title: '', h1: '', text: '', links: [] };
    }

    const data = await page.evaluate(() => {
      const title = document.title || '';
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const main = document.querySelector('main');
      const text = main ? main.textContent.replace(/\s+/g, ' ').trim().substring(0, 2000) : '';
      const links = Array.from(document.querySelectorAll('main a[href]')).map(a => ({
        href: a.getAttribute('href'),
        text: a.textContent.trim().substring(0, 100),
      }));
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';

      // Get date elements
      const times = Array.from(document.querySelectorAll('time')).map(t => ({
        datetime: t.getAttribute('datetime') || '',
        text: t.textContent.trim(),
      }));

      // Get all headings
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => ({
        level: h.tagName,
        text: h.textContent.trim().substring(0, 200),
      }));

      return { title, h1, text, links, metaDesc, ogTitle, times, headings };
    });

    return { status: 200, ...data };
  } catch (err) {
    return { status: 0, error: err.message, title: '', h1: '', text: '', links: [] };
  }
}

async function comparePage(browser, path) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const gatsbyData = await getPageContent(page, `${GATSBY_BASE}${path}`);
  const astroData = await getPageContent(page, `${ASTRO_BASE}${path}`);

  const issues = [];

  if (gatsbyData.status !== 200) {
    issues.push(`Gatsby returned ${gatsbyData.status}`);
  }
  if (astroData.status !== 200) {
    issues.push(`Astro returned ${astroData.status}`);
  }

  if (gatsbyData.status === 200 && astroData.status === 200) {
    // Compare titles
    if (gatsbyData.title !== astroData.title) {
      issues.push(`TITLE MISMATCH:\n  Gatsby: "${gatsbyData.title}"\n  Astro:  "${astroData.title}"`);
    }

    // Compare H1
    if (gatsbyData.h1 !== astroData.h1) {
      issues.push(`H1 MISMATCH:\n  Gatsby: "${gatsbyData.h1}"\n  Astro:  "${astroData.h1}"`);
    }

    // Compare meta description
    if (gatsbyData.metaDesc !== astroData.metaDesc) {
      issues.push(`META DESC MISMATCH:\n  Gatsby: "${gatsbyData.metaDesc}"\n  Astro:  "${astroData.metaDesc}"`);
    }

    // Compare date formats
    if (gatsbyData.times?.length > 0 || astroData.times?.length > 0) {
      const gatsbyTimes = (gatsbyData.times || []).map(t => t.text).join(', ');
      const astroTimes = (astroData.times || []).map(t => t.text).join(', ');
      if (gatsbyTimes !== astroTimes) {
        issues.push(`DATE MISMATCH:\n  Gatsby: "${gatsbyTimes}"\n  Astro:  "${astroTimes}"`);
      }
    }

    // Compare heading count
    const gatsbyHeadingCount = (gatsbyData.headings || []).length;
    const astroHeadingCount = (astroData.headings || []).length;
    if (gatsbyHeadingCount !== astroHeadingCount) {
      issues.push(`HEADING COUNT: Gatsby=${gatsbyHeadingCount}, Astro=${astroHeadingCount}`);
    }

    // Compare link count
    const gatsbyLinkCount = gatsbyData.links.length;
    const astroLinkCount = astroData.links.length;
    if (Math.abs(gatsbyLinkCount - astroLinkCount) > 2) {
      issues.push(`LINK COUNT: Gatsby=${gatsbyLinkCount}, Astro=${astroLinkCount}`);
    }

    // Check content similarity (rough)
    const gatsbyWords = gatsbyData.text.split(' ').slice(0, 50).join(' ');
    const astroWords = astroData.text.split(' ').slice(0, 50).join(' ');
    if (gatsbyWords !== astroWords) {
      issues.push(`CONTENT DRIFT (first 50 words differ):\n  Gatsby: "${gatsbyWords.substring(0, 200)}..."\n  Astro:  "${astroWords.substring(0, 200)}..."`);
    }
  }

  await context.close();

  return {
    path,
    gatsbyStatus: gatsbyData.status,
    astroStatus: astroData.status,
    issues,
    gatsbyData,
    astroData,
  };
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  const allPages = [...keyPages, ...samplePosts];

  console.log(`Comparing ${allPages.length} pages...\n`);

  for (const path of allPages) {
    process.stdout.write(`Checking ${path}... `);
    const result = await comparePage(browser, path);
    results.push(result);

    if (result.issues.length === 0) {
      console.log('OK');
    } else {
      console.log(`${result.issues.length} issue(s)`);
      result.issues.forEach(i => console.log(`  - ${i}`));
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== SUMMARY ===');
  const issuePages = results.filter(r => r.issues.length > 0);
  console.log(`Total pages: ${results.length}`);
  console.log(`Pages with issues: ${issuePages.length}`);
  console.log(`Pages OK: ${results.length - issuePages.length}`);

  // Write detailed results
  fs.writeFileSync('/tmp/comparison-results.json', JSON.stringify(results, null, 2));
  console.log('\nDetailed results saved to /tmp/comparison-results.json');
}

main().catch(console.error);

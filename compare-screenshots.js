#!/usr/bin/env node

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function takeScreenshots() {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }

    console.log('Taking screenshot of live site...');
    const livePage = await context.newPage();
    await livePage.goto('https://queen.raae.codes/', { waitUntil: 'networkidle' });
    await livePage.screenshot({
        path: path.join(screenshotsDir, 'live-site.png'),
        fullPage: true
    });
    console.log('✓ Live site screenshot saved to screenshots/live-site.png');

    console.log('\nTaking screenshot of test site...');
    const testPage = await context.newPage();
    await testPage.goto('http://queen.test/', { waitUntil: 'networkidle' });
    await testPage.screenshot({
        path: path.join(screenshotsDir, 'test-site.png'),
        fullPage: true
    });
    console.log('✓ Test site screenshot saved to screenshots/test-site.png');

    await browser.close();

    console.log('\n✓ Screenshots completed! Check the screenshots/ directory.');
}

takeScreenshots().catch(console.error);

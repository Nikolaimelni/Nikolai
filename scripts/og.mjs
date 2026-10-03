// Renders the social card and the touch icon into public/. The card goes through
// Chromium because sharp's SVG renderer ignores @font-face.
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { profile } from '../src/data/profile.ts';

const tokens = await readFile('src/styles/tokens.css', 'utf8');
const favicon = await readFile('public/favicon.svg', 'utf8');

const escapeHtml = (text) => text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const card = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap"
    />
    <style>
      ${tokens}
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 22px;
        padding: 0 104px;
        background: var(--paper);
        color: var(--ink);
        font-family: 'Plus Jakarta Sans', sans-serif;
        position: relative;
        overflow: hidden;
      }
      .edge {
        position: absolute;
        inset: 0 auto 0 0;
        width: 26px;
        background: linear-gradient(0deg, var(--vivid), var(--vivid-blue));
      }
      .dots {
        position: absolute;
        top: 74px;
        right: 78px;
        width: 176px;
        height: 176px;
        background-image: radial-gradient(var(--vivid) 3px, transparent 3.2px);
        background-size: 22px 22px;
        opacity: 0.45;
      }
      h1 { font-size: 86px; font-weight: 800; letter-spacing: -0.03em; }
      .role { font-size: 44px; font-weight: 600; color: var(--green); }
      p { font-size: 38px; color: var(--muted); max-width: 22ch; line-height: 1.3; text-wrap: balance; }
      ul { display: flex; gap: 56px; list-style: none; padding: 0; margin-top: 14px; }
      li { font-size: 30px; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="edge"></div>
    <div class="dots"></div>
    <h1>${escapeHtml(profile.name)}</h1>
    <div class="role">${escapeHtml(profile.role)}</div>
    <p>${escapeHtml(profile.tagline)}</p>
    <ul>
      <li>${escapeHtml(`${profile.location.city}, ${profile.location.country}`)}</li>
    </ul>
  </body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  colorScheme: 'light',
});
await page.setContent(card, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();

const background = '<rect width="512" height="512" rx="96" fill="#fbfcfb"/>';
const icon = favicon.replace(/<svg[^>]*>/, `$&${background}`);

await writeFile(
  'public/apple-touch-icon.png',
  await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer(),
);

console.log('wrote public/og.png and public/apple-touch-icon.png');

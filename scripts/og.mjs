// Renders the social card and the touch icon into public/. The card goes through
// Chromium because sharp's SVG renderer ignores @font-face.
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import astroConfig from '../astro.config.mjs';
import { profile } from '../src/data/profile.ts';

const tokens = await readFile('src/styles/tokens.css', 'utf8');
const favicon = await readFile('public/favicon.svg', 'utf8');
const domain = new URL(astroConfig.site ?? '').host.replace(/^www\./, '');

const escapeHtml = (text) => text.replace(/[&<>"]/g, (char) => `&#${char.charCodeAt(0)};`);

const card = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Orbitron:wght@700&family=Roboto+Mono:wght@500&display=swap"
    />
    <style>
      ${tokens}
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 72px 88px 64px;
        background: linear-gradient(160deg, var(--forest-glow), var(--forest) 50%, var(--forest-deep));
        color: var(--forest-ink);
        font-family: 'Inter', sans-serif;
        overflow: hidden;
      }
      .mark svg {
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 18px;
        box-shadow: 0 0 0 1px rgb(255 255 255 / 0.14);
      }
      h1 {
        font-family: 'Orbitron', sans-serif;
        font-size: 58px;
        font-weight: 700;
        line-height: 1.15;
        text-wrap: balance;
      }
      .name { display: block; color: var(--lime); }
      p {
        margin-top: 22px;
        max-width: 34ch;
        font-size: 30px;
        line-height: 1.35;
        text-wrap: balance;
        color: var(--forest-text);
      }
      footer {
        font-family: 'Roboto Mono', monospace;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--forest-muted);
      }
    </style>
  </head>
  <body>
    <div class="mark">${favicon.replace(/<\?xml[^>]*>\s*/, '')}</div>
    <main>
      <h1>
        <span class="name">I&rsquo;m ${escapeHtml(profile.name)}</span>
        ${escapeHtml(profile.headline)}
      </h1>
      <p>${escapeHtml(profile.subhead)}</p>
    </main>
    <footer>${escapeHtml(domain)}</footer>
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

const background = '<rect width="512" height="512" fill="#174030"/>';
const icon = favicon.replace(/<svg[^>]*>/, `$&${background}`);

await writeFile(
  'public/apple-touch-icon.png',
  await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer(),
);

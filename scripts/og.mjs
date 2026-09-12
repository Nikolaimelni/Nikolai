// Renders the social card and the touch icon into public/.
// Run with `pnpm og` after changing the name, role or palette.
//
// The card goes through Chromium rather than sharp's SVG renderer, which
// ignores an embedded @font-face and silently falls back to whatever the host
// has installed. A browser gets the same Plus Jakarta Sans the site uses, so
// the card matches the page and regenerating it anywhere produces the same file.
import { writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

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
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 22px;
        padding: 0 104px;
        background: #fbfcfb;
        color: #101714;
        font-family: 'Plus Jakarta Sans', sans-serif;
        position: relative;
        overflow: hidden;
      }
      .edge {
        position: absolute;
        inset: 0 auto 0 0;
        width: 26px;
        background: linear-gradient(0deg, #00b945, #1a1eb2);
      }
      .dots {
        position: absolute;
        top: 74px;
        right: 78px;
        width: 176px;
        height: 176px;
        background-image: radial-gradient(#00b945 3px, transparent 3.2px);
        background-size: 22px 22px;
        opacity: 0.45;
      }
      h1 { font-size: 86px; font-weight: 800; letter-spacing: -0.03em; }
      .role { font-size: 44px; font-weight: 600; color: #046a38; }
      p { font-size: 38px; color: #5a6660; max-width: 22ch; line-height: 1.3; }
      ul { display: flex; gap: 56px; list-style: none; padding: 0; margin-top: 14px; }
      li { font-size: 30px; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="edge"></div>
    <div class="dots"></div>
    <h1>Nikolai Melnichenko</h1>
    <div class="role">Front-End Developer</div>
    <p>React and TypeScript for products that ship in seven regulated markets.</p>
    <ul>
      <li>Lisbon, Portugal</li>
      <li>EU work authorization</li>
    </ul>
  </body>
</html>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#fbfcfb"/>
  <path fill="#1a1eb2" d="M183.5,390.4c-2.9,0-5.9-1.1-8.2-3.3L53.5,272.6c-4.4-4.1-6.9-9.9-6.9-16s2.5-11.9,6.8-16l121.9-115.8c4.8-4.6,12.4-4.4,17,0.4c4.6,4.8,4.4,12.4-0.4,17L71.5,256.6l120.3,113.1c4.8,4.5,5.1,12.1,0.5,17C189.9,389.1,186.7,390.4,183.5,390.4z"/>
  <path fill="#00b945" d="M328.5,390.4c-3.2,0-6.4-1.3-8.7-3.8c-4.5-4.8-4.3-12.4,0.5-17l120.3-113.1L320.2,142.3c-4.8-4.6-5-12.2-0.4-17c4.6-4.8,12.2-5,17-0.4l121.9,115.8c4.4,4.1,6.9,10,6.8,16s-2.5,11.8-6.9,16L336.7,387.1C334.4,389.3,331.4,390.4,328.5,390.4z"/>
</svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(card, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();

await writeFile(
  'public/apple-touch-icon.png',
  await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer(),
);

console.log('wrote public/og.png and public/apple-touch-icon.png');

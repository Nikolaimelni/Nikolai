// Renders the social card and the touch icon into public/.
// Run with `pnpm og` after changing the name, role or palette.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="brand" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#00b945"/>
      <stop offset="1" stop-color="#1a1eb2"/>
    </linearGradient>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="3" fill="#00b945" fill-opacity="0.45"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#fbfcfb"/>
  <rect x="0" y="0" width="26" height="630" fill="url(#brand)"/>
  <rect x="946" y="74" width="176" height="176" fill="url(#dots)"/>

  <text x="104" y="214" font-family="Segoe UI, Arial, sans-serif" font-size="86" font-weight="800" fill="#101714">Nikolai Melnichenko</text>
  <text x="104" y="304" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="600" fill="#046a38">Front-End Developer</text>
  <text x="104" y="404" font-family="Segoe UI, Arial, sans-serif" font-size="38" fill="#5a6660">React and TypeScript for products that ship</text>
  <text x="104" y="456" font-family="Segoe UI, Arial, sans-serif" font-size="38" fill="#5a6660">in seven regulated markets.</text>

  <text x="104" y="556" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#101714">Lisbon, Portugal</text>
  <text x="420" y="556" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#101714">EU work authorization</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#fbfcfb"/>
  <path fill="#1a1eb2" d="M183.5,390.4c-2.9,0-5.9-1.1-8.2-3.3L53.5,272.6c-4.4-4.1-6.9-9.9-6.9-16s2.5-11.9,6.8-16l121.9-115.8c4.8-4.6,12.4-4.4,17,0.4c4.6,4.8,4.4,12.4-0.4,17L71.5,256.6l120.3,113.1c4.8,4.5,5.1,12.1,0.5,17C189.9,389.1,186.7,390.4,183.5,390.4z"/>
  <path fill="#00b945" d="M328.5,390.4c-3.2,0-6.4-1.3-8.7-3.8c-4.5-4.8-4.3-12.4,0.5-17l120.3-113.1L320.2,142.3c-4.8-4.6-5-12.2-0.4-17c4.6-4.8,12.2-5,17-0.4l121.9,115.8c4.4,4.1,6.9,10,6.8,16s-2.5,11.8-6.9,16L336.7,387.1C334.4,389.3,331.4,390.4,328.5,390.4z"/>
</svg>`;

await writeFile('public/og.png', await sharp(Buffer.from(card)).png().toBuffer());
await writeFile(
  'public/apple-touch-icon.png',
  await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer(),
);

console.log('wrote public/og.png and public/apple-touch-icon.png');
